import * as ExcelJS from 'exceljs'

import { RiphCtisDto } from 'src/etl/dto/RiphCtisDto'
import { RiphDmDto } from 'src/etl/dto/RiphDmDto'
import { RiphJardeDto } from 'src/etl/dto/RiphJardeDto'

interface Column {
  header: string;
  key: string;
}

export class StreamingExcelExporter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private wb: ExcelJS.stream.xlsx.WorkbookWriter
  private sheets: Record<string, ExcelJS.Worksheet> = {}
  private sheetColumns: Record<string, Column[]> = {}

  init(
    filePath: string,
    sheetConfigs: {
      key: string
      name: string
      columns: Column[]
    }[]
  ) {
    this.wb = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: filePath,
      useSharedStrings: false, // important pour la mémoire
      useStyles: true, // nécessaire pour header style
    })

    for (const sheetInfo of sheetConfigs) {
      const ws = this.wb.addWorksheet(sheetInfo.name)

      // Colonnes
      ws.columns = sheetInfo.columns.map((c) => ({
        header: c.header,
        key: c.key,
        width: 40,
      }))

      // ===== HEADER STYLE =====
      const headerRow = ws.getRow(1)

      headerRow.eachCell((cell) => {
        cell.fill = {
          fgColor: { argb: 'FFC0E6F5' },
          pattern: 'solid',
          type: 'pattern',
        }

        cell.font = { bold: true }

        cell.alignment = {
          vertical: 'middle',
          wrapText: true,
        }
      })

      headerRow.commit()

      // ===== AUTO FILTER =====
      ws.autoFilter = {
        from: { column: 1, row: 1 },
        to: { column: sheetInfo.columns.length, row: 1 },
      }

      this.sheets[sheetInfo.key] = ws
      this.sheetColumns[sheetInfo.key] = sheetInfo.columns
    }
  }

  buildRow(record: RiphDmDto | RiphJardeDto | RiphCtisDto, columns:Column[]): (string | number)[] {
    return columns.map((col) => {
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

  appendRow(type: string, record: RiphDmDto | RiphJardeDto | RiphCtisDto, columns:Column[]) {
    const ws = this.sheets[type]
    const row = ws.addRow(this.buildRow(record, columns))
    row.eachCell((cell) => {
      cell.alignment = { vertical: 'top', wrapText: true }
    })
    row.commit()
  }

  async finalize() {
    for (const ws of Object.values(this.sheets)) {
      ws.commit()
    }
    await this.wb.commit()
  }

}