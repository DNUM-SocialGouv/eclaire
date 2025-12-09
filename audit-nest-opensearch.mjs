#!/usr/bin/env node
/**
 * audit-nest-opensearch.js
 *
 * Usage:
 *   # à la racine du repo
 *   node audit-nest-opensearch.js
 *
 * Dépendances:
 *   npm i glob @babel/parser @babel/traverse chalk
 *
 * Ce script :
 * - vérifie main.ts pour ValidationPipe, helmet, throttler
 * - recherche DTOs et controllers qui les importent
 * - repère occurrences "query_string" / usage potentiellement dangereux d'OpenSearch
 * - signale template literals / concaténations dans client.search / client.index
 * - signale usages de requêtes SQL brutes (SELECT/INSERT via template)
 *
 * Résultat : JSON imprimé + résumé lisible.
 */

import fs from "fs";
import path from "path";
import { glob } from "glob";
import * as parser from "@babel/parser";
import traversePkg from "@babel/traverse";
import chalk from "chalk";

const repoRoot = process.cwd();

function readFileSafe(p) {
    try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; }
}

function scanMain() {
    const mainPathCandidates = [
        path.join(repoRoot, 'src', 'main.ts'),
        path.join(repoRoot, 'main.ts'),
    ];
    for (const p of mainPathCandidates) {
        if (fs.existsSync(p)) {
            const src = readFileSafe(p);
            const res = {
                path: p,
                hasValidationPipe: /useGlobalPipes\(|ValidationPipe/.test(src),
                hasHelmet: /helmet\(|app\.use\(\s*helmet/.test(src),
                hasThrottler: /ThrottlerModule|throttle/i.test(src),
                hasExceptionFilter: /useGlobalFilters|ExceptionFilter/.test(src),
            };
            return res;
        }
    }
    return { path: null, hasValidationPipe: false, hasHelmet: false, hasThrottler: false, hasExceptionFilter: false };
}

function findFiles(globPattern) {
    return glob.sync(globPattern, { cwd: repoRoot, absolute: true, nodir: true });
}

function findDtoFiles() {
    // convention: *dto.ts
    return findFiles('**/*dto.ts').map(p => path.relative(repoRoot, p));
}

function findControllers() {
    return findFiles('src/**/*.controller.ts').map(p => path.relative(repoRoot, p));
}

function controllersImportingDtos(controllerPaths, dtoFiles) {
    const dtosBasenames = dtoFiles.map(f => path.basename(f, '.ts'));
    const report = [];
    controllerPaths.forEach(ctrlRel => {
        const abs = path.join(repoRoot, ctrlRel);
        const src = readFileSafe(abs);
        if (!src) return;
        const importsDto = dtosBasenames.some(d => new RegExp(`from\\s+['"].*${d}['"]`).test(src) || new RegExp(`import\\s+\\{?\\s*${d}\\s*\\}?\\s+from`).test(src));
        // also check presence of @Body decorator
        const usesBody = /@Body\(|@Body\(/.test(src);
        report.push({ controller: ctrlRel, importsDto: !!importsDto, usesBody: !!usesBody });
    });
    return report;
}

function searchUnsafePatterns() {
    const allTs = findFiles('src/**/*.ts');
    const findings = [];
    allTs.forEach(abs => {
        const rel = path.relative(repoRoot, abs);
        const src = readFileSafe(abs);
        if (!src) return;
        // simple checks
        if (/query_string\s*:/.test(src) || /query_string\"/.test(src) || /query_string'/.test(src)) {
            findings.push({ file: rel, type: 'opensearch_query_string', snippet: getSnippet(src, 'query_string') });
        }
        // template literal inside client.search or client.index call
        if (/client\.(search|index)\s*\([^)]*`/.test(src)) {
            findings.push({ file: rel, type: 'client_template_literal', snippet: getSnippet(src, 'client.search') });
        }
        // string concat in client.search / index
        if (/client\.(search|index)\s*\([^)]*['"][^'"]*\s*\+\s*\w+/.test(src)) {
            findings.push({ file: rel, type: 'client_string_concat', snippet: getSnippet(src, 'client.search') });
        }
        // raw JSON building from user input (very heuristic)
        if (/body\s*:\s*\{[\s\S]*\breq\.body\b|\buserInput\b|\bparams\./.test(src)) {
            findings.push({ file: rel, type: 'body_from_req', snippet: getSnippet(src, 'req.body') });
        }
        // detect "search?" + body usage (old ES)
        if (/\.search\([^)]*body\s*:/.test(src)) {
            findings.push({ file: rel, type: 'client_search_with_body', snippet: getSnippet(src, '.search(') });
        }
        // detect raw SQL patterns with template literals
        if (/(SELECT|INSERT|UPDATE|DELETE).*(\$\{|\+)/i.test(src) && /`|['"]/.test(src)) {
            findings.push({ file: rel, type: 'raw_sql_template', snippet: getSnippet(src, 'SELECT') });
        }
        // detect potential use of query_string via string building
        if (/query_string.*\+|query_string.*`/.test(src)) {
            findings.push({ file: rel, type: 'query_string_build', snippet: getSnippet(src, 'query_string') });
        }
    });
    // dedupe
    return findings;
}

function getSnippet(src, token) {
    const idx = src.indexOf(token);
    if (idx === -1) return token;
    const start = Math.max(0, idx - 80);
    const end = Math.min(src.length, idx + 200);
    return src.substring(start, end).replace(/\n/g, ' ');
}

function runAstChecks() {
    // Check for raw ValidationPipe initialization elsewhere, and import of ValidationPipe from @nestjs/common
    const main = scanMain();
    // also search for useGlobalPipes anywhere
    const allTs = findFiles('src/**/*.ts');
    let useGlobalPipesAnywhere = false;
    allTs.forEach(f => {
        const s = readFileSafe(f);
        if (s && /useGlobalPipes\(/.test(s)) useGlobalPipesAnywhere = true;
    });
    return { main, useGlobalPipesAnywhere };
}

function summaryReport() {
    const mainScan = scanMain();
    const dtoFiles = findDtoFiles();
    const controllers = findControllers();
    const ctrlReport = controllersImportingDtos(controllers, dtoFiles);
    const unsafe = searchUnsafePatterns();
    const ast = runAstChecks();

    const out = {
        timestamp: new Date().toISOString(),
        main: mainScan,
        astSummary: ast,
        dtoCount: dtoFiles.length,
        dtoFiles,
        controllers: ctrlReport,
        unsafePatterns: unsafe,
        stats: {
            totalTsFiles: findFiles('src/**/*.ts').length,
            controllersCount: controllers.length,
        }
    };
    return out;
}

function printHuman(report) {
    console.log(chalk.bold('\n=== Audit NestJS + OpenSearch (rapide) ===\n'));
    console.log('Checked repo:', repoRoot);
    console.log('Timestamp:', report.timestamp, '\n');

    console.log(chalk.yellow('1) main.ts / bootstrap checks:'));
    if (report.main.path) {
        console.log(' - main.ts found at', report.main.path);
        console.log('   - ValidationPipe global:', report.main.hasValidationPipe ? chalk.green('OK') : chalk.red('MISSING'));
        console.log('   - helmet:', report.main.hasHelmet ? chalk.green('OK') : chalk.red('MISSING'));
        console.log('   - throttler/ThrottlerModule presence:', report.main.hasThrottler ? chalk.green('OK?') : chalk.red('MISSING'));
        console.log('   - exception filter present:', report.main.hasExceptionFilter ? chalk.green('OK?') : chalk.red('MISSING'));
    } else {
        console.log(chalk.red(' - main.ts not found (expected src/main.ts or main.ts)'));
    }

    console.log('\n' + chalk.yellow('2) DTOs & Controllers:'));
    console.log(` - DTO files found: ${report.dtoCount}`);
    report.controllers.forEach(c => {
        const issues = [];
        if (!c.usesBody) issues.push('no @Body() (maybe only params/query)');
        if (!c.importsDto && c.usesBody) issues.push('uses @Body() but no DTO import found');
        const status = issues.length ? chalk.red(issues.join('; ')) : chalk.green('ok or DTO imported');
        console.log(` - ${c.controller}: ${status}`);
    });

    console.log('\n' + chalk.yellow('3) Patterns potentiellement dangereux (OpenSearch / raw query / template usage):'));
    if (report.unsafePatterns.length === 0) {
        console.log(' - Aucun pattern critique trouvé par heuristique (mais pas garanti).');
    } else {
        report.unsafePatterns.forEach(f => {
            console.log(chalk.red(` - [${f.type}] ${f.file}`));
            console.log('    snippet:', f.snippet);
        });
    }

    console.log('\n' + chalk.yellow('4) Recommandations immédiates (quick wins):'));
    if (!report.main.hasValidationPipe && !report.astSummary.useGlobalPipesAnywhere) {
        console.log(chalk.red(' - Activer ValidationPipe global (whitelist, forbidNonWhitelisted, transform).'));
    } else {
        console.log(chalk.green(' - ValidationPipe global détecté.'));
    }
    if (!report.main.hasHelmet) {
        console.log(chalk.red(' - Ajouter helmet() pour headers de sécurité.'));
    }
    if (!report.main.hasThrottler) {
        console.log(chalk.red(' - Ajouter rate limiting (ThrottlerModule) pour limiter abus).'));
    }

    console.log('\n' + chalk.bold('=== Fin du rapport ===\n'));
}

function main() {
    const report = summaryReport();
    // write json file
    const outPath = path.join(repoRoot, 'audit-report-opensearch.json');
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(chalk.green('Audit écrit ->', outPath));
    printHuman(report);
}

main();
