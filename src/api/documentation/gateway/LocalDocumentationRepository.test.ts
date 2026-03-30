import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

import { LocalDocumentationRepository } from './LocalDocumentationRepository'

vi.mock('fs', () => ({
  existsSync: vi.fn(),
}))

describe('LocalDocumentationRepository', () => {
  let repository: LocalDocumentationRepository

  beforeEach(() => {
    vi.clearAllMocks()
    repository = new LocalDocumentationRepository()
  })

  it('should return full path if file exists', async () => {
    const filename = 'file.pdf'
    const expectedPath = path.join(process.cwd(), 'documentation/files', filename)
    ;(fs.existsSync as any).mockReturnValue(true)

    const result = await repository.getFilePath(filename)

    expect(fs.existsSync).toHaveBeenCalledWith(expectedPath)
    expect(result).toBe(expectedPath)
  })

  it('should throw error if file does not exist', async () => {
    const filename = 'missing.pdf'
    const expectedPath = path.join(process.cwd(), 'documentation/files', filename)
    ;(fs.existsSync as any).mockReturnValue(false)

    await expect(repository.getFilePath(filename)).rejects.toThrow(
      `File not found: ${filename}`
    )

    expect(fs.existsSync).toHaveBeenCalledWith(expectedPath)
  })
})