import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

interface Column {
    header: string;
    key: string;
}

interface SheetData<T> {
    name: string;
    data: T[];
    columns: Column[];
}

export class StreamingExcelExporter {

    async exportSheets(sheets: SheetData<any>[]) {
        const filePath = path.join(process.cwd(), "Export_suivi_remplissage_ECLAIRE.xlsx");
        const tmpPath = filePath + ".tmp";

        // Remove tmp if exists
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);

        const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
            filename: tmpPath,
            useStyles: true,
            useSharedStrings: true,
        });

        const BATCH_SIZE = 500;

        for (const sheetInfo of sheets) {
            const ws = wb.addWorksheet(sheetInfo.name);

            // --- Set columns & header ---
            ws.columns = sheetInfo.columns.map(c => ({ header: c.header, key: c.key, width: 40 }));

            //const headerRow = ws.addRow(sheetInfo.columns.map(c => c.header));
            const headerRow = ws.getRow(1);
            headerRow.eachCell(cell => {
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFC0E6F5" } };
                cell.font = { bold: true };
                cell.alignment = { wrapText: true, vertical: "middle" };
            });
            headerRow.commit();

            //ws.views = [{ state: "frozen", ySplit: 1 }];
            ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: sheetInfo.columns.length } };


            // --- Helper pour construire une ligne à partir d'un enregistrement ---
            const buildRow = (record: any) => {
                return sheetInfo.columns.map(col => {
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

            // --- Write data in batches ---
            for (let i = 0; i < sheetInfo.data.length; i += BATCH_SIZE) {
                const batch = sheetInfo.data.slice(i, i + BATCH_SIZE);
                for (const record of batch) {
                    const rowValues = buildRow(record);
                    const row = ws.addRow(rowValues);
                    row.eachCell(cell => {
                        cell.alignment = { wrapText: true, vertical: "top" };
                    });
                    row.commit();
                }
                await new Promise(r => setImmediate(r)); // let event loop breathe
            }

            ws.commit();
        }

        await wb.commit();
        fs.renameSync(tmpPath, filePath);
        console.log("Excel exported successfully with all sheets in batches!");
    }
}
