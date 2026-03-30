import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ExportJobService } from './ExportJobService'

describe('ExportJobService', () => {
  let service: ExportJobService
  let esServiceMock: any

  beforeEach(() => {
    vi.clearAllMocks()
    esServiceMock = {
      client: {
        get: vi.fn(),
        update: vi.fn(),
        indices: { exists: vi.fn() },
      },
      createAnIndex: vi.fn(),
      indexDocument: vi.fn(),
      countDocuments: vi.fn(),
    }
    service = new ExportJobService(esServiceMock)
  })

  it('should create a job if none is running', async () => {
    esServiceMock.countDocuments.mockResolvedValue(0)
    esServiceMock.indexDocument.mockResolvedValue(undefined)

    const job = await service.createJob()

    expect(job.id).toBeDefined()
    expect(job.status).toBe('pending')
    expect(esServiceMock.indexDocument).toHaveBeenCalledWith(
      'export_jobs',
      job.id,
      job
    )
  })

  it('should throw if a job is already running', async () => {
    esServiceMock.countDocuments.mockResolvedValue(1)

    await expect(service.createJob()).rejects.toThrow(
      'Un export est déjà en cours.'
    )
  })

  it('getJob should return job if found', async () => {
    const mockJob = { id: '123', status: 'pending', progress: 0 }
    esServiceMock.client.get.mockResolvedValue({ body: { _source: mockJob } })

    const result = await service.getJob('123')
    expect(result).toEqual(mockJob)
  })

  it('getJob should return null if not found', async () => {
    esServiceMock.client.get.mockRejectedValue(new Error('Not found'))

    const result = await service.getJob('missing')
    expect(result).toBeNull()
  })

  it('updatePhase should call client.update', async () => {
    esServiceMock.client.update.mockResolvedValue({})

    await service.updatePhase('id1', 'ready')
    expect(esServiceMock.client.update).toHaveBeenCalled()
  })

  it('updateProgress should call client.update', async () => {
    esServiceMock.client.get.mockResolvedValue({ body: { _source: { progress: 0 } } })
    esServiceMock.client.update.mockResolvedValue({})

    await service.updateProgress('id1', 50)
    expect(esServiceMock.client.update).toHaveBeenCalled()
  })

  it('complete should call client.update', async () => {
    esServiceMock.client.update.mockResolvedValue({})

    await service.complete('id1', '/path/file.csv')
    expect(esServiceMock.client.update).toHaveBeenCalled()
  })

  it('fail should call client.update', async () => {
    esServiceMock.client.update.mockResolvedValue({})

    await service.fail('id1', 'some error')
    expect(esServiceMock.client.update).toHaveBeenCalled()
  })
})