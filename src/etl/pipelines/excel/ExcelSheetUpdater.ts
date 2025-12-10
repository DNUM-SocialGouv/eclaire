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

    private buildRow(record: any, columns: Column[]) {
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
    }

    async updateSheet<T>(sheetName: string, data: T[], columns: Column[]) {
        const filePath = path.join(process.cwd(), 'Export_suivi_remplissage_ECLAIRE.xlsx');
        const tempFilePath = filePath + '.tmp';
        const tempStreamPath = tempFilePath + '.stream.xlsx';

        this.logger.info(`[Excel] Début de la mise à jour de l’onglet "${sheetName}"`);

        // --- 1) Charger le fichier existant pour récupérer les petits onglets ---
        const workbook = new ExcelJS.Workbook();
        if (fs.existsSync(filePath)) {
            await workbook.xlsx.readFile(filePath);
        }

        // --- 2) Supprimer l'ancien onglet volumineux si présent ---
        const oldSheet = workbook.getWorksheet(sheetName);
        if (oldSheet) workbook.removeWorksheet(oldSheet.id);

        // --- 3) Écrire l'onglet volumineux en streaming ---
        const workbookStream = new ExcelJS.stream.xlsx.WorkbookWriter({
            filename: tempStreamPath,
            useStyles: true,
            useSharedStrings: true
        });

        const sheetStream = workbookStream.addWorksheet(sheetName);

        sheetStream.columns = columns.map(c => ({ header: c.header, key: c.key, width: 40 }));

        const headerRow = sheetStream.getRow(1);
        headerRow.eachCell(cell => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC0E6F5' } };
            cell.font = { bold: true };
            cell.alignment = { wrapText: true, vertical: 'middle' };
        });
        headerRow.commit();

        const BATCH_SIZE = 500;
        for (let start = 0; start < data.length; start += BATCH_SIZE) {
            const end = Math.min(start + BATCH_SIZE, data.length);
            const batch = data.slice(start, end);
            this.logger.info(`[Excel] Streaming Batch, start: ${start}, end: ${end} (${batch.length} lignes)`);

            for (const record of batch) {
                const rowValues = this.buildRow(record, columns);
                const row = sheetStream.addRow(rowValues);
                row.eachCell(cell => { cell.alignment = { wrapText: true, vertical: 'top' }; });
                row.commit();
            }
            await new Promise(r => setImmediate(r));
        }

        await workbookStream.commit();
        this.logger.info(`[Excel] Grand onglet "${sheetName}" écrit en streaming`);

        // --- 4) Charger le fichier streaming dans un workbook normal ---
        const workbookFinal = new ExcelJS.Workbook();
        await workbookFinal.xlsx.readFile(tempStreamPath);

        // --- 5) Ajouter les petits onglets existants (hors sheetName) ---
        workbook.eachSheet(origSheet => {
            if (origSheet.name === sheetName) return;

            const newSheet = workbookFinal.addWorksheet(origSheet.name);
            //newSheet.columns = origSheet.columns.map(c => ({ header: c.header, key: c.key, width: c.width || 20 }));

            const firstRow = origSheet.getRow(1);
            newSheet.columns =
                origSheet.columns && origSheet.columns.length > 0 ?
                    origSheet.columns.map(c => ({ header: c.header, key: c.key, width: c.width || 40 })) :
                    Array.isArray(firstRow.values) ?
                        firstRow.values.slice(1).map((v: any) => ({ header: v?.toString() || '', key: v?.toString() || '', width: 40 })) :
                        [];

            origSheet.eachRow({ includeEmpty: true }, row => {
                const rowValues: any[] = [];
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    rowValues[colNumber - 1] = cell.value;
                });
                const newRow = newSheet.addRow(rowValues);
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                    newRow.getCell(colNumber).style = cell.style;
                });
            });
        });

        // --- 6) Appliquer freeze + autoFilter à tous les onglets après ajout de tous les onglets ---
        workbookFinal.eachSheet(sheet => {
            // Freeze header
            sheet.views = [{ state: 'frozen', ySplit: 1 }];
            // AutoFilter sur la ligne 1
            if (sheet.columnCount > 0) {
                sheet.autoFilter = {
                    from: { row: 1, column: 1 },
                    to: { row: 1, column: sheet.columnCount }
                };
            }
        });

        // --- 7) Sauvegarde finale et suppression des fichiers temporaires ---
        await workbookFinal.xlsx.writeFile(tempFilePath);
        if (fs.existsSync(tempStreamPath)) fs.unlinkSync(tempStreamPath);
        fs.renameSync(tempFilePath, filePath);

        this.logger.info(`[Excel] Tous les onglets mis à jour avec succès et fichiers temporaires supprimés`);
    }
}
