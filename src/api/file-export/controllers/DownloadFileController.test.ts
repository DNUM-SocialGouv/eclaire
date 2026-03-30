import { describe, it, expect, vi, beforeEach } from 'vitest'

import { ExportController } from './DownloadFileController'

describe('exportController', () => {
  let controller: ExportController

  const mockEtlService = { generateFileWithPhases: vi.fn() }

  const mockJobService = {
    createJob: vi.fn(),
    getJob: vi.fn(),
    updateProgress: vi.fn(),
    updatePhase: vi.fn(),
    complete: vi.fn(),
    fail: vi.fn(),
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

    expect(result).toEqual({ jobId: '123' })
    expect(mockJobService.createJob).toHaveBeenCalledWith()
  })

  it('should return job status', async () => {
    const job = { id: '123', status: 'processing' }
    mockJobService.getJob.mockResolvedValue(job)

    const result = await controller.getStatus('123')

    expect(result).toEqual(job)
  })

  it('should return error if job not found', async () => {
    mockJobService.getJob.mockResolvedValue(null)

    const result = await controller.getStatus('123')

    expect(result).toEqual({ error: 'Job not found' })
  })

  it('should send file if job is done', async () => {
    const job = { id: '123', status: 'done', filePath: '/tmp/file.xlsx' }
    mockJobService.getJob.mockResolvedValue(job)

    const res = { download: vi.fn() } as any

    await controller.download('123', res)

    expect(res.download).toHaveBeenCalledWith('/tmp/file.xlsx', 'export.xlsx')
  })

  it('should return 400 if file not ready', async () => {
    const job = { id: '123', status: 'processing', filePath: null }
    mockJobService.getJob.mockResolvedValue(job)

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any

    await controller.download('123', res)

    expect(res.status).toHaveBeenCalledWith(400)
  })
})
