import { Controller, Get, Inject } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

import { StatisticsRepository } from '../application/StatisticsRepository'

@ApiExcludeController()
@Controller('/api/statistics')
export class GetStatisticsController {
  constructor(@Inject('StatisticsRepository') private readonly StatisticsService: StatisticsRepository) {}

  @Get()
  async getStatDocuments(): Promise<Record<string, number>> {
    return await this.StatisticsService.findStat()
  }
}
