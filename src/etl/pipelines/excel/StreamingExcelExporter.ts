import * as ExcelJS from 'exceljs'
import fs from 'fs'
import path from 'path'

interface Column {
    header: string;
    key: string;
}

interface SheetData<T extends Record<string, unknown>> {
    name: string;
    data: T[];
    columns: Column[];
}

export class StreamingExcelExporter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async exportSheets(sheets: SheetData<any>[]) {
    const filePath = path.join('/tmp', 'Export_suivi_remplissage_ECLAIRE.xlsx')
    const tmpPath = filePath + '.tmp'

    if (fs.existsSync(tmpPath)) {
      fs.unlinkSync(tmpPath)
    }

    const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: tmpPath,
      useSharedStrings: false, // update to false for optimisation
      useStyles: false, // update to false for optimisation
    })

    const BATCH_SIZE = 1000

    for (const sheetInfo of sheets) {
      const ws = wb.addWorksheet(sheetInfo.name)

      // Pré-calcul des colonnes pour éviter split à chaque ligne
      const columnConfigs = sheetInfo.columns.map((c) => {
        const isSiteField = c.key.startsWith('sites_investigateurs.')
        const siteField = isSiteField ? c.key.split('.')[1] : null

        return {
          header: c.header,
          key: c.key,
          width: 40,
          isSiteField,
          siteField,
        }
      })

      ws.columns = columnConfigs.map((c) => ({
        header: c.header,
        key: c.key,
        width: c.width,
        style: {
          alignment: { vertical: 'top', wrapText: true }, // to delete after switch on S3
        },
      }))

      // Header commit direct (sans styles lourds)
      ws.getRow(1).commit()
      /* const headerRow = ws.getRow(1)
      headerRow.eachCell((cell) => {
        cell.fill = {
          fgColor: { argb: 'FFC0E6F5' },
          pattern: 'solid',
          type: 'pattern',
        }
        cell.font = { bold: true }
        cell.alignment = { vertical: 'middle', wrapText: true }
      })
      headerRow.commit() */

      ws.autoFilter = {
        from: { column: 1, row: 1 },
        to: { column: columnConfigs.length, row: 1 },
      }

      const buildRow = (record: Record<string, unknown>): (string | number)[] => {
        return columnConfigs.map((col) => {
          const rawValue = record[col.key]          

          if (col.isSiteField && col.siteField) {
            //const field = key.split('.')[1]
            const sites = Array.isArray(record.sites_investigateurs)
              ? (record.sites_investigateurs as Record<string, unknown>[])
              : []
            return sites
              .map((s) => (s?.[col.siteField] as string | undefined) ?? '')
              .filter((v) => v !== '')
              .join('\n')
          }

          if (col.key === 'criteres_eligibilite' || col.key === 'criteres_jugement') {
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

      const data = sheetInfo.data
      for (let i = 0; i < data.length; i++) {
        const row = ws.addRow(buildRow(data[i]))
        row.commit()

        // Yield non bloquant
        if (i % BATCH_SIZE === 0) {
          await new Promise<void>((resolve) => setImmediate(resolve))
        }        
        
        /* const batch = data.slice(i, i + BATCH_SIZE)
        for (const record of batch) {
          const rowValues = buildRow(record)
          const row = ws.addRow(rowValues)

          // to decomment after swith on S3
          /* row.eachCell((cell) => {
            cell.alignment = { vertical: 'top', wrapText: true }
          }) 

          row.commit()
        }

        await new Promise((resolve) => setImmediate(resolve)) */
      }

      ws.commit()
    }

    await wb.commit()
    fs.renameSync(tmpPath, filePath)
    
    return filePath
  }
}
