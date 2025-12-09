import ExcelJS from 'exceljs'
import path from 'path'
import { LoggerService } from '../../../shared/logger/LoggerService';

interface Column {
    header: string;
    key: string;
}

export class ExcelSheetUpdater {
    constructor(
        protected readonly logger: LoggerService
    ) { }

    async updateSheet<T>(sheetName: string, data: T[], columns: Column[]) {
        const filePath = path.join(process.cwd(), 'Export_suivi_remplissage_ECLAIRE.xlsx')
        // --- Vérifier si le fichier existe ---
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const sheet = workbook.getWorksheet(sheetName);
        if (!sheet) throw new Error(`La feuille "${sheetName}" n'existe pas`);

        this.logger.info(`Mise à jour de l'onglet ${sheetName} dans : ${filePath}`)
        // --- Supprimer anciennes lignes sauf header ---
        const lastRow = sheet.rowCount;
        for (let i = lastRow; i >= 2; i--) {
            sheet.spliceRows(i, 1);
        }

        // --- Ajouter nouvelles données ---
        for (const record of data) {
            const rowValues = columns.map(col => {
                const key = col.key;

                // Cas spécial : sites
                if (key.startsWith('sites.')) {
                    const field = key.split('.')[1];
                    return (record['sites'] ?? [])
                        .map(s => s?.[field] ?? '')
                        .filter(Boolean)
                        .join('\n');
                }

                // Cas pour les Jarde et DMDIV
                if (key.startsWith('sites_investigateurs.')) {
                    const field = key.split('.')[1];
                    return (record['sites_investigateurs'] ?? [])
                        .map(s => s?.[field] ?? '')
                        .filter(Boolean)
                        .join('\n');
                }

                // Cas spécial : critères
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

                // Mapping direct
                return record[key] ?? '';
            });

            const row = sheet.addRow(rowValues);
            row.eachCell(cell => {
                cell.alignment = { wrapText: true, vertical: 'top' };
            });
        }

        // --- Réactivation des filtres automatiques ---
        sheet.autoFilter = {
            from: { row: 1, column: 1 },
            to: { row: 1, column: sheet.actualColumnCount }
        }

        // --- Appliquer background sur header sans toucher aux filtres ---
        const headerRow = sheet.getRow(1);
        headerRow.eachCell(cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFC0E6F5' },
            };
            cell.font = { bold: true };
        });
        headerRow.commit();

        // --- Freeze pane ligne 1 ---
        sheet.views = [
            {
                state: 'frozen',
                ySplit: 1,
                activeCell: 'A2',
            },
        ];

        // --- Sauvegarde ---
        await workbook.xlsx.writeFile(filePath);
        this.logger.info(`Onglet "${sheetName}" mis à jour avec ${data.length} lignes.`)
    }
}
