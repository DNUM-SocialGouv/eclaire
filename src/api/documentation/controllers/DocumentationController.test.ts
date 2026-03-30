import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DownloadDocumentationController } from './DocumentationController'
import { DocumentationRepository } from '../application/DocumentationRepository'
import { NotFoundException } from '@nestjs/common'

describe('DownloadDocumentationController', () => {
  let controller: DownloadDocumentationController
  let repository: DocumentationRepository
  let res: any

  beforeEach(() => {
    vi.clearAllMocks()

    repository = {
      getFilePath: vi.fn(),
    } as unknown as DocumentationRepository

    controller = new DownloadDocumentationController(repository)

    res = {
      setHeader: vi.fn(),
      sendFile: vi.fn(),
    }
  })

  it('should throw NotFoundException if file type is not allowed', async () => {
    (repository.getFilePath as any).mockResolvedValue('/tmp/file.exe')

    await expect(controller.getFile('file.exe', res))
      .rejects
      .toBeInstanceOf(NotFoundException)
  })

  it('should call sendFile for allowed file type', async () => {
    (repository.getFilePath as any).mockResolvedValue('/tmp/file.pdf')

    await controller.getFile('file.pdf', res)

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf')
    expect(res.sendFile).toHaveBeenCalledWith('/tmp/file.pdf')
  })

  it('should set correct content type for JPG', async () => {
    (repository.getFilePath as any).mockResolvedValue('/tmp/file.jpg')

    await controller.getFile('file.jpg', res)

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/jpeg')
    expect(res.sendFile).toHaveBeenCalledWith('/tmp/file.jpg')
  })

  it('should throw NotFoundException if repository throws', async () => {
    (repository.getFilePath as any).mockRejectedValue(new Error('File not found'))

    await expect(controller.getFile('file.pdf', res))
      .rejects
      .toBeInstanceOf(NotFoundException)
  })
})