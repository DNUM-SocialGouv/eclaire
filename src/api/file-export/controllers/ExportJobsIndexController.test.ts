import { describe, it, expect, vi, beforeEach } from 'vitest'

import { ExportJobsIndexController } from './ExportJobsIndexController'

describe('exportJobsIndexController', () => {
  let controller: ExportJobsIndexController

  const mockJobService = { createIndex: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
    controller = new ExportJobsIndexController(mockJobService as any)
  })

  it('should create index and return success message', async () => {
    const result = await controller.createIndex()

    expect(mockJobService.createIndex).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ message: 'Export jobs index created' })
  })
})
