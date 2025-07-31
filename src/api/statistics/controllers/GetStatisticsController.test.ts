import { describe, it, expect, vi, beforeEach } from 'vitest'

import { GetStatisticsController } from './GetStatisticsController'
import { StatisticsRepository } from '../application/StatisticsRepository'

describe('getStatisticsController', () => {
  let controller: GetStatisticsController
  const mockStatisticsRepository: StatisticsRepository = { findStat: vi.fn() }

  beforeEach(() => {
    vi.clearAllMocks()
    controller = new GetStatisticsController(mockStatisticsRepository)
  })

  it('should return statistics from the repository', async () => {
    const mockData = {
      'Investigations_cliniques_(DM)': 20,
      Total_etudes: 100,
    }

    vi.spyOn(mockStatisticsRepository, 'findStat').mockResolvedValue(mockData)

    const result = await controller.getStatDocuments()

    expect(result).toStrictEqual(mockData)
    expect(mockStatisticsRepository.findStat).toHaveBeenCalledTimes(1)
  })
})
