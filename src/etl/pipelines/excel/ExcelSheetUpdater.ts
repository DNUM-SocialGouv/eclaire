import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { LoggerService } from '../../../shared/logger/LoggerService';

interface Column {
    header: string;
    key: string;
}

export class ExcelSheetUpdater {
    constructor(private readonly logger: LoggerService) { }

    // Fonction Auto-Fit des colonnes
    private autoFitColumns(sheet: ExcelJS.Worksheet) {
        sheet.columns.forEach(column => {
            let maxLength = 10;

            column.eachCell({ includeEmpty: true }, cell => {
                const val = cell.value ? cell.value.toString() : "";
                const longestLine = val
                    .split("\n")
                    .reduce((max, line) => Math.max(max, line.length), 0);

                maxLength = Math.max(maxLength, longestLine);
            });

            column.width = maxLength + 2;
        });
    }

    async updateSheet<T>(sheetName: string, data: T[], columns: Column[]) {
        const filePath = path.join(process.cwd(), 'Export_suivi_remplissage_ECLAIRE.xlsx');
        const tempFilePath = filePath + '.tmp';

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        this.logger.info(`[Excel] Reconstruction totale de l’onglet "${sheetName}"`);

        // --- 1) Supprimer l'ancien onglet (s'il existe) ---
        const oldSheet = workbook.getWorksheet(sheetName);
        if (oldSheet) workbook.removeWorksheet(oldSheet.id);

        // --- 2) Créer un nouvel onglet propre ---
        const sheet = workbook.addWorksheet(sheetName);

        // --- 3) Ajouter les headers via sheet.columns (fixe clé & header) ---
        sheet.columns = columns.map(c => ({ header: c.header, key: c.key }));

        // --- 4) Formater le header (couleur & bold) ---
        const headerRow = sheet.getRow(1);
        headerRow.eachCell(cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFC0E6F5' }
            };
            cell.font = { bold: true };
            // Optionnel : alignement du header
            cell.alignment = { wrapText: true, vertical: 'middle' };
        });
        headerRow.commit();

        // --- 5) Appliquer le filtre automatique sur le header ---
        const lastCol = columns.length || 1;
        sheet.autoFilter = {
            from: { row: 1, column: 1 },
            to: { row: 1, column: lastCol }
        };

        // --- 6) Freeze la première ligne ---
        sheet.views = [{ state: 'frozen', ySplit: 1 }];

        // --- Helper pour construire une ligne à partir d'un enregistrement ---
        const buildRow = (record: any) => {
            return columns.map(col => {
                const key = col.key;

                if (key.startsWith('sites.')) {
                    const field = key.split('.')[1];
                    return (record.sites ?? [])
                        .map((s: any) => s?.[field] ?? '')
                        .filter(Boolean)
                        .join('\n');
                }

                if (key.startsWith('sites_investigateurs.')) {
                    const field = key.split('.')[1];
                    return (record.sites_investigateurs ?? [])
                        .map((s: any) => s?.[field] ?? '')
                        .filter(Boolean)
                        .join('\n');
                }

                if (key === 'criteres_eligibilite' || key === 'criteres_jugement') {
                    const arr = record[key];
                    if (!arr) return '';
                    return arr
                        .map(a => {
                            const name = a?.titre?.trim() ?? '';
                            const type = a?.type?.trim() ?? '';
                            if (!name && !type) return '';
                            return `[Name : ${name} ; Type : ${type}]`;
                        })
                        .filter(Boolean)
                        .join('\n');
                }

                return record[key] ?? '';
            });
        };

        // --- 7) Écriture par batchs pour limiter la mémoire ---
        const BATCH_SIZE = 1000;
        for (let start = 0; start < data.length; start += BATCH_SIZE) {
            const end = Math.min(start + BATCH_SIZE, data.length);
            const batch = data.slice(start, end);

            this.logger.info(`[Excel] Batch, start: ${start} , end:  ${end}, (${batch.length} lignes)`);

            for (const record of batch) {
                const rowValues = buildRow(record);
                const row = sheet.addRow(rowValues);
                row.eachCell(cell => {
                    cell.alignment = { wrapText: true, vertical: 'top' };
                });
            }

            // Laisser l'event loop respirer pour GC
            await new Promise(r => setImmediate(r));
        }

        // Auto-fit automatique juste avant sauvegarde ---
        this.autoFitColumns(sheet);

        // --- 8) Sauvegarde sécurisée via fichier temporaire ---
        await workbook.xlsx.writeFile(tempFilePath);

        // Remplacement atomique
        fs.renameSync(tempFilePath, filePath);

        this.logger.info(`[Excel] Onglet "${sheetName}" mis à jour (${data.length} lignes).`);
    }
}
