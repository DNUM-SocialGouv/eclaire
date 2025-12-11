import * as path from 'path'

import { FileExportRepository } from '../application/FileExportRepository'

export class LocalFileExportRepository implements FileExportRepository {
  async getExportFilePath(): Promise<string> {
    return Promise.resolve(
      path.join('/tmp', 'Export_suivi_remplissage_ECLAIRE.xlsx')
    )
  }
}
