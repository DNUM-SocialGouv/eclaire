/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call */
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { ExportJobService } from './ExportJobService'

describe('exportJobService', () => {
  let service: ExportJobService
  let esServiceMock: any

  beforeEach(() => {
    vi.clearAllMocks()
    esServiceMock = {
      client: {
        get: vi.fn(),
        indices: { exists: vi.fn() },
        update: vi.fn(),

      },
      countDocuments: vi.fn(),
      createAnIndex: vi.fn(),
      indexDocument: vi.fn(),
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
    const mockJob = { id: '123', progress: 0, status: 'pending' }
    esServiceMock.client.get.mockResolvedValue({ body: { _source: mockJob } })

    const result = await service.getJob('123')
    expect(result).toStrictEqual(mockJob)
  })

  it('getJob should return null if not found', async () => {
    esServiceMock.client.get.mockRejectedValue(new Error('Not found'))

    const result = await service.getJob('missing')
    expect(result).toBeNull()
  })

  it('updatePhase should call client.update', async () => {
    esServiceMock.client.update.mockResolvedValue({})

    await service.updatePhase('id1', 'ready')
    expect(esServiceMock.client.update).toHaveBeenCalledWith({
      index: 'export_jobs',
      id: 'id1',
      refresh: false,
      retry_on_conflict: 5,
      body: {
        doc: {
          phase: 'ready',
          updatedAt: expect.any(String),
        },
      },
    })
  })

  it('updateProgress should call client.update', async () => {
    esServiceMock.client.get.mockResolvedValue({ body: { _source: { progress: 0 } } })
    esServiceMock.client.update.mockResolvedValue({})

    await service.updateProgress('id1', 50)
    expect(esServiceMock.client.update).toHaveBeenCalledWith(
      expect.objectContaining({
        index: 'export_jobs',
        id: 'id1',
        retry_on_conflict: 3,
        refresh: false,
        body: {
          script: expect.objectContaining({
            params: expect.objectContaining({
              progress: 50,
              updatedAt: expect.any(String), // dynamic value
            }),
            source: expect.stringContaining('ctx._source.progress'),
          }),
        },
      })
    )
  })

  it('complete should call client.update', async () => {
    esServiceMock.client.update.mockResolvedValue({})

    await service.complete('id1', '/path/file.csv')
    expect(esServiceMock.client.update).toHaveBeenCalledWith({
      index: 'export_jobs',
      id: 'id1',
      refresh: false,
      retry_on_conflict: 5,
      body: {
        doc: {
          filePath: "/path/file.csv",
          phase: "ready",
          progress: 99,
          status: 'done',
          updatedAt: expect.any(String),
        },
      },
    })
  })

  it('fail should call client.update', async () => {
    esServiceMock.client.update.mockResolvedValue({})

    await service.fail('id1', 'some error')
    expect(esServiceMock.client.update).toHaveBeenCalledWith({
      index: 'export_jobs',
      id: 'id1',
      refresh: false,
      retry_on_conflict: 5,
      body: {
        doc: {
          status: 'error',
          error: 'some error',
          updatedAt: expect.any(String),
        },
      },
    })
  })
})
