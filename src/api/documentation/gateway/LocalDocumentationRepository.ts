import * as fs from 'fs'
import * as path from 'path'

import { DocumentationRepository } from '../application/DocumentationRepository'

export class LocalDocumentationRepository implements DocumentationRepository {
  private readonly baseDir: string

  constructor() {
    // The documentation folder at the root of the project
    this.baseDir = path.join(process.cwd(), 'documentation/files')
  }

  async getFilePath(filename: string): Promise<string> {
    // 1. Clean up the filename (prevents ../)
    const safeFilename = path.basename(filename)

    // 2. Construct the absolute path
    const filePath = path.join(this.baseDir, safeFilename)

    // 3. Critical security: verify that the path remains in baseDir
    const resolvedPath = path.resolve(filePath)
    const resolvedBase = path.resolve(this.baseDir)

    if (!resolvedPath.startsWith(resolvedBase)) {
      throw new Error('Invalid file path')
    }

    // 4. Verify existence
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found: ${filename}`)
    }

    return resolvedPath
  }
}
