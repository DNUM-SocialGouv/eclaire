import * as fs from 'fs'
import * as path from 'path'

import { DocumentationRepository } from '../application/DocumentationRepository'

export class LocalDocumentationRepository implements DocumentationRepository {
  private readonly baseDir: string

  constructor() {
    // Le dossier documentation à la racine du projet
    this.baseDir = path.join(process.cwd(), 'documentation/files')
  }

  async getFilePath(filename: string): Promise<string> {
    const filePath = path.join(this.baseDir, filename)

    // Vérification que le fichier existe
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filename}`)
    }

    return Promise.resolve(filePath)
  }
}
