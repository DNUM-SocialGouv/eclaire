import { NotFoundException } from '@nestjs/common'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { DownloadDocumentationController } from './DocumentationController'
import { DocumentationRepository } from '../application/DocumentationRepository'

describe('downloadDocumentationController', () => {
  let controller: DownloadDocumentationController
  let repository: DocumentationRepository
  let res: any

  beforeEach(() => {
    vi.clearAllMocks()

    repository = { getFilePath: vi.fn() } as unknown as DocumentationRepository

    controller = new DownloadDocumentationController(repository)

    res = {
      sendFile: vi.fn(),
      setHeader: vi.fn(),
    }
  })

  it('should throw NotFoundException if file type is not allowed', async () => {
    (repository.getFilePath as Mock).mockResolvedValue('/documentation/files/file.exe')

    await expect(controller.getFile('file.exe', res))
      .rejects
      .toBeInstanceOf(NotFoundException)
  })

  it('should call sendFile for allowed file type', async () => {
    (repository.getFilePath as Mock).mockResolvedValue('/documentation/files/file.pdf')

    await controller.getFile('file.pdf', res)

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf')
    expect(res.sendFile).toHaveBeenCalledWith('/documentation/files/file.pdf')
  })

  it('should set correct content type for JPG', async () => {
    (repository.getFilePath as Mock).mockResolvedValue('/documentation/files/file.jpg')

    await controller.getFile('file.jpg', res)

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'image/jpeg')
    expect(res.sendFile).toHaveBeenCalledWith('/documentation/files/file.jpg')
  })

  it('should throw NotFoundException if repository throws', async () => {
    (repository.getFilePath as Mock).mockRejectedValue(new Error('File not found'))

    await expect(controller.getFile('file.pdf', res))
      .rejects
      .toBeInstanceOf(NotFoundException)
  })
})
