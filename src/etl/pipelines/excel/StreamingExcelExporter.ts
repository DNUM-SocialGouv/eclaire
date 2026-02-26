import * as ExcelJS from 'exceljs'

import { RiphCtisDto } from 'src/etl/dto/RiphCtisDto'
import { RiphDmDto } from 'src/etl/dto/RiphDmDto'
import { RiphJardeDto } from 'src/etl/dto/RiphJardeDto'

interface Column {
  header: string;
  key: string;
}

interface SheetData {
  name: string;
  data: unknown[];
  columns: Column[];
}

export class StreamingExcelExporter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async exportSheets(
    sheets: SheetData[],
    filePath: string,
    onBatchProcessed?: (processed: number, total: number) => void
  ): Promise<void> {


    const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: filePath,
      useSharedStrings: false,
      useStyles: true,
    })

    const BATCH_SIZE = 500
    // 1. Total global de toutes les lignes
    const totalRows = sheets.reduce((acc, sheet) => acc + sheet.data.length, 0)
    let processedRows = 0

    for (const sheetInfo of sheets) {
      const ws = wb.addWorksheet(sheetInfo.name)

      ws.columns = sheetInfo.columns.map((c) => ({
        header: c.header,
        key: c.key,
        width: 40,
      }))

      const headerRow = ws.getRow(1)
      headerRow.eachCell((cell) => {
        cell.fill = {
          fgColor: { argb: 'FFC0E6F5' },
          pattern: 'solid',
          type: 'pattern',
        }
        cell.font = { bold: true }
        cell.alignment = { vertical: 'middle', wrapText: true }
      })
      headerRow.commit()

      ws.autoFilter = {
        from: { column: 1, row: 1 },
        to: { column: sheetInfo.columns.length, row: 1 },
      }

      const buildRow = (record: RiphDmDto | RiphJardeDto | RiphCtisDto): (string | number)[] => {
        return sheetInfo.columns.map((col) => {
          const key = col.key
          const rawValue = record[key]

          if (key.startsWith('sites_investigateurs.')) {
            const field = key.split('.')[1]
            const sites = Array.isArray(record.sites_investigateurs)
              ? (record.sites_investigateurs as Record<string, unknown>[])
              : []
            return sites
              .map((s) => (s?.[field] as string | undefined) ?? '')
              .filter((v) => v !== '')
              .join('\n')
          }

          if (key === 'criteres_eligibilite' || key === 'criteres_jugement') {
            const arr = Array.isArray(rawValue) ? (rawValue as Record<string, string>[]) : []
            return arr
              .map((a) => {
                const name = a?.titre?.trim() ?? ''
                const type = a?.type?.trim() ?? ''
                if (!name && !type) return ''
                return `[Name : ${name} ; Type : ${type}]`
              })
              .filter((v) => v !== '')
              .join('\n')
          }

          return (rawValue as string | number | undefined) ?? ''
        })
      }

      for (let i = 0; i < sheetInfo.data.length; i += BATCH_SIZE) {
        const batch = sheetInfo.data.slice(i, i + BATCH_SIZE)
        for (const record of batch) {
          const rowValues = buildRow(record as RiphDmDto | RiphJardeDto | RiphCtisDto)
          const row = ws.addRow(rowValues)

          row.eachCell((cell) => {
            cell.alignment = { vertical: 'top', wrapText: true }
          })

          row.commit()
          processedRows++
        }
        
        // 2. On envoie le progress global
        if (onBatchProcessed) {
          onBatchProcessed(processedRows, totalRows)
        }

        // micro-yield pour éviter blocage event loop
        await new Promise((resolve) => setImmediate(resolve))
      }

      ws.commit()
    }

    await wb.commit()
  }
}
