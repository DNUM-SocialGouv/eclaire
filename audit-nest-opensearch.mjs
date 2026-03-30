import fs from "fs";
import path from "path";
import { glob } from "glob";
import chalk from "chalk";

const repoRoot = process.cwd();

// ignore DTOs used for mapping only
const IGNORED_DTO = [
  'EclaireDto.ts'
]

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; }
}

function findFiles(globPattern) {
  return glob.sync(globPattern, { cwd: repoRoot, absolute: true, nodir: true });
}

// === Scan main.ts (ValidationPipe et Helmet) ===
function scanMain() {
  const mainPathCandidates = [
    path.join(repoRoot, 'src', 'main.ts'),
    path.join(repoRoot, 'main.ts'),
  ];
  for (const p of mainPathCandidates) {
    if (fs.existsSync(p)) {
      const src = readFileSafe(p);
      return {
        path: p,
        hasValidationPipe: /useGlobalPipes\(|ValidationPipe/.test(src),
        hasHelmet: /helmet\(|app\.use\(\s*helmet/.test(src),
      };
    }
  }
  return { path: null, hasValidationPipe: false, hasHelmet: false };
}

// === Scan global project for Throttler and ExceptionFilter ===
function scanProjectSecurity() {
  const allTs = findFiles('src/**/*.ts');

  let hasThrottlerModule = false;
  let hasThrottlerGuard = false;
  let hasExceptionFilter = false;
  let throttlerEnvControlled = false;

  allTs.forEach(file => {
    const src = readFileSafe(file);
    if (!src) return;

    if (src.includes('ThrottlerModule.forRoot')) hasThrottlerModule = true;
    if (src.includes('ThrottlerGuard') || src.includes('APP_GUARD')) hasThrottlerGuard = true;
    if (src.includes('ExceptionFilter') || src.includes('APP_FILTER') || src.includes('SentryGlobalFilter')) hasExceptionFilter = true;
    if (src.includes('API_RATE_LIMIT_ENABLED')) throttlerEnvControlled = true;
  });

  return {
    throttler: hasThrottlerModule && hasThrottlerGuard,
    exceptionFilter: hasExceptionFilter,
    throttlerEnvControlled
  };
}

// === DTOs ===
function findDtoFiles() {
  return findFiles('**/*Dto.ts')
    .map(p => path.relative(repoRoot, p))
    .filter(p => !IGNORED_DTO.includes(path.basename(p)));
}

function detectDtoValidation(dtoFiles) {
  const report = [];
  dtoFiles.forEach(dto => {
    const abs = path.join(repoRoot, dto);
    const src = readFileSafe(abs);
    if (!src) return;
    const hasValidator =
      src.includes('@IsString') ||
      src.includes('@IsNumber') ||
      src.includes('@IsOptional') ||
      src.includes('@IsBoolean') ||
      src.includes('@IsEnum');
    report.push({ dto, hasValidator });
  });
  return report;
}

// === Controllers ===
function findControllers() {
  return findFiles('src/api/*/controllers/*Controller.ts').map(p => path.relative(repoRoot, p));
}

function controllersImportingDtos(controllerPaths, dtoFiles) {
  const dtosBasenames = dtoFiles.map(f => path.basename(f, '.ts'));
  const report = [];
  controllerPaths.forEach(ctrlRel => {
    const abs = path.join(repoRoot, ctrlRel);
    const src = readFileSafe(abs);
    if (!src) return;
    const importsDto = dtosBasenames.some(d =>
      new RegExp(`from\\s+['"].*${d}['"]`).test(src) ||
      new RegExp(`import\\s+\\{?\\s*${d}\\s*\\}?\\s+from`).test(src)
    );
    const usesBody = /@Body\(/.test(src);
    report.push({ controller: ctrlRel, importsDto: !!importsDto, usesBody: !!usesBody });
  });
  return report;
}

// === Unsafe patterns ===
function searchUnsafePatterns() {
  const allTs = findFiles('src/**/*.ts');
  const findings = [];
  allTs.forEach(abs => {
    const rel = path.relative(repoRoot, abs);
    const src = readFileSafe(abs);
    if (!src) return;

    if (/query_string\s*:/.test(src) || /query_string['"]/.test(src)) {
      findings.push({ file: rel, type: 'opensearch_query_string', snippet: getSnippet(src, 'query_string') });
    }

    if (/client\.(search|index)\s*\([^)]*`/.test(src)) {
      findings.push({ file: rel, type: 'client_template_literal', snippet: getSnippet(src, 'client.search') });
    }

    if (/client\.(search|index)\s*\([^)]*['"][^'"]*\s*\+\s*\w+/.test(src)) {
      findings.push({ file: rel, type: 'client_string_concat', snippet: getSnippet(src, 'client.search') });
    }

    if (/body\s*:\s*\{[\s\S]*\breq\.body\b|\buserInput\b|\bparams\./.test(src)) {
      findings.push({ file: rel, type: 'body_from_req', snippet: getSnippet(src, 'req.body') });
    }

    if (/\.search\([^)]*body\s*:/.test(src)) {
      findings.push({ file: rel, type: 'client_search_with_body', snippet: getSnippet(src, '.search(') });
    }

    if (/(SELECT|INSERT|UPDATE|DELETE).*(\$\{|\+)/i.test(src) && /`|['"]/.test(src)) {
      findings.push({ file: rel, type: 'raw_sql_template', snippet: getSnippet(src, 'SELECT') });
    }

    if (/client\.search/.test(src) && !/size\s*:/.test(src)) {
      findings.push({ file: rel, type: 'opensearch_no_size_limit', snippet: getSnippet(src, 'client.search') });
    }

    if (/(@Get|@Post|@Patch|@Delete)/.test(src) && !src.includes('CacheInterceptor') && !src.includes('@UseInterceptors')) {
      findings.push({ file: rel, type: 'endpoint_without_cache', snippet: getSnippet(src, '@Get') });
    }
  });
  return findings;
}

function getSnippet(src, token) {
  const idx = src.indexOf(token);
  if (idx === -1) return token;
  const start = Math.max(0, idx - 80);
  const end = Math.min(src.length, idx + 200);
  return src.substring(start, end).replace(/\n/g, ' ');
}

// === Summary ===
function summaryReport() {
  const mainScan = scanMain();
  const projectSecurity = scanProjectSecurity();
  const dtoFiles = findDtoFiles();
  const dtoValidation = detectDtoValidation(dtoFiles);
  const controllers = findControllers();
  const ctrlReport = controllersImportingDtos(controllers, dtoFiles);
  const unsafe = searchUnsafePatterns();
  const score = computeScore({
    main: mainScan,
    projectSecurity,
    dtoValidation,
    unsafePatterns: unsafe
  })

  return {
    timestamp: new Date().toISOString(),
    main: mainScan,
    projectSecurity,
    dtoCount: dtoFiles.length,
    dtoFiles,
    dtoValidation,
    controllers: ctrlReport,
    unsafePatterns: unsafe,
    score,
    stats: {
      totalTsFiles: findFiles('src/**/*.ts').length,
      controllersCount: controllers.length,
    }
  };
}

function computeScore(report) {
  let score = 100
  const issues = []

  if (!report.main.hasValidationPipe) {
    score -= 15
    issues.push("ValidationPipe manquant")
  }

  if (!report.main.hasHelmet) {
    score -= 10
    issues.push("Helmet manquant")
  }

  if (!report.projectSecurity.throttler) {
    score -= 15
    issues.push("Rate limiting manquant")
  }

  if (!report.projectSecurity.exceptionFilter) {
    score -= 10
    issues.push("Exception filter manquant")
  }

  // DTO validation
  const invalidDtos = report.dtoValidation.filter(d => !d.hasValidator)
  if (invalidDtos.length > 0) {
    score -= 15
    issues.push(`${invalidDtos.length} DTO sans validation`)
  }

  // unsafe patterns
  if (report.unsafePatterns.length > 0) {
    score -= Math.min(20, report.unsafePatterns.length * 2)
    issues.push(`${report.unsafePatterns.length} patterns potentiellement dangereux`)
  }

  return {
    score: Math.max(0, score),
    issues
  }
}

// === Human-readable output ===
function printHuman(report) {
  console.log(chalk.bold('\n=== Audit NestJS + OpenSearch (enhanced) ===\n'));
  console.log('Checked repo:', repoRoot);
  console.log('Timestamp:', report.timestamp, '\n');

  console.log(chalk.yellow('1) main.ts / bootstrap checks:'));
  if (report.main.path) {
    console.log(' - main.ts found at', report.main.path);
    console.log('   - ValidationPipe global:', report.main.hasValidationPipe ? chalk.green('OK') : chalk.red('MISSING'));
    console.log('   - helmet:', report.main.hasHelmet ? chalk.green('OK') : chalk.red('MISSING'));
    console.log('   - throttler/ThrottlerModule presence:', report.projectSecurity.throttler ? chalk.green('OK') : chalk.red('MISSING'));
    console.log('   - exception filter present:', report.projectSecurity.exceptionFilter ? chalk.green('OK') : chalk.red('MISSING'));
  } else {
    console.log(chalk.red(' - main.ts not found (expected src/main.ts or main.ts)'));
  }

  console.log('\n' + chalk.yellow('2) DTOs & Controllers:'));
  console.log(` - DTO files found: ${report.dtoCount}`);
  report.dtoValidation.forEach(d => {
    console.log(` - ${d.dto}:`, d.hasValidator ? chalk.green('validated') : chalk.red('NO VALIDATION DECORATORS'));
  });
  report.controllers.forEach(c => {
    const issues = [];
    /* if (!c.usesBody) issues.push('no @Body() (maybe only params/query)');
    if (!c.importsDto && c.usesBody) issues.push('uses @Body() but no DTO import found'); */
    if (c.usesBody && !c.importsDto) {
      issues.push('uses @Body() but no DTO import found');
    }
    const status = issues.length ? chalk.red(issues.join('; ')) : chalk.green('ok or DTO imported');
    console.log(` - ${c.controller}: ${status}`);
  });

  console.log('\n' + chalk.yellow('3) Patterns potentiellement dangereux / performance:'));
  if (report.unsafePatterns.length === 0) {
    console.log(' - Aucun pattern critique trouvé par heuristique (mais pas garanti).');
  } else {
    report.unsafePatterns.forEach(f => {
      console.log(chalk.red(` - [${f.type}] ${f.file}`));
      console.log('    snippet:', f.snippet);
    });
  }

  console.log(chalk.cyan('\n=== GLOBAL PROJECT SCORE ==='))
  const score = report.score.score

  let color = chalk.green
  if (score < 80) color = chalk.yellow
  if (score < 60) color = chalk.red

  console.log('Security & Performance score:', color(score + '/100'))

  if (report.score.issues.length) {
    console.log('\nMain issues:')
    report.score.issues.forEach(i => {
      console.log('-', chalk.red(i))
    })
  }

  console.log('\n' + chalk.yellow('4) Recommandations immédiates:'));
  if (!report.main.hasValidationPipe) console.log(chalk.red(' - Activer ValidationPipe global (whitelist, forbidNonWhitelisted, transform).'));
  if (!report.main.hasHelmet) console.log(chalk.red(' - Ajouter helmet() pour headers de sécurité.'));
  if (!report.projectSecurity.throttler) console.log(chalk.red(' - Ajouter rate limiting (ThrottlerModule + ThrottlerGuard).'));
  if (!report.projectSecurity.exceptionFilter) console.log(chalk.red(' - Ajouter un exception filter global (APP_FILTER).'));
  console.log(chalk.green(' - DTO validation détectée sur certains DTOs'));
}

function main() {
  const report = summaryReport();
  const outPath = path.join(repoRoot, 'audit-report-opensearch-enhanced.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(chalk.green('Audit écrit ->', outPath));
  printHuman(report);
}

main();