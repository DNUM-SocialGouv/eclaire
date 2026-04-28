import * as path from 'path'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { LocalFileExportRepository } from './LocalFileExportRepository'

describe('localFileExportRepository', () => {
  let repository: LocalFileExportRepository

  beforeEach(() => {
    vi.clearAllMocks()
    repository = new LocalFileExportRepository()
  })

  it('should return correct export file path', async () => {
    const result = await repository.getExportFilePath()

    expect(result).toBe(
      path.join('/tmp', 'Export_suivi_remplissage_ECLAIRE.xlsx')
    )
  })
})
