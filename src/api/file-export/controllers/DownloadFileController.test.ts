import { describe, it, expect, vi, beforeEach } from 'vitest'

import { ExportController } from './DownloadFileController'

describe('exportController', () => {
  let controller: ExportController

  const mockEtlService = { generateFileWithPhases: vi.fn() }

  const mockJobService = {
    complete: vi.fn(),
    createJob: vi.fn(),
    fail: vi.fn(),
    getJob: vi.fn(),
    updatePhase: vi.fn(),
    updateProgress: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    controller = new ExportController(
      mockEtlService as any,
      mockJobService as any
    )
  })

  it('should start export and return jobId', async () => {
    mockJobService.createJob.mockResolvedValue({ id: '123' })

    const result = await controller.startExport()

    expect(result).toStrictEqual({ jobId: '123' })
    expect(mockJobService.createJob).toHaveBeenCalledWith()
  })

  it('should return job status', async () => {
    const job = { id: '123', status: 'processing' }
    mockJobService.getJob.mockResolvedValue(job)

    const result = await controller.getStatus('123')

    expect(result).toStrictEqual(job)
  })

  it('should return error if job not found', async () => {
    mockJobService.getJob.mockResolvedValue(null)

    const result = await controller.getStatus('123')

    expect(result).toStrictEqual({ error: 'Job not found' })
  })

  it('should send file if job is done', async () => {
    const job = { filePath: '/documentation/files/file.xlsx', id: '123', status: 'done' }
    mockJobService.getJob.mockResolvedValue(job)

    const res = { download: vi.fn() } as any

    await controller.download('123', res)

    expect(res.download).toHaveBeenCalledWith('/documentation/files/file.xlsx', 'export.xlsx')
  })

  it('should return 400 if file not ready', async () => {
    const job = { filePath: null, id: '123', status: 'processing' }
    mockJobService.getJob.mockResolvedValue(job)

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any

    await controller.download('123', res)

    expect(res.status).toHaveBeenCalledWith(400)
  })
})
