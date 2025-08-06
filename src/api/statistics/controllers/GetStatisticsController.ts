import { Controller, Get, Inject, Header } from '@nestjs/common'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger'

import { StatisticsRepository } from '../application/StatisticsRepository'

@ApiTags('Statistics')
@Controller('/api/statistics')
export class GetStatisticsController {
  constructor(@Inject('StatisticsRepository') private readonly StatisticsService: StatisticsRepository) {}

  @ApiOperation({ summary: 'Récupère le nombre d’essais cliniques.' })
  @ApiOkResponse({ description: 'Aperçu des statistiques d’essais cliniques' })
  @ApiNotFoundResponse({ description: 'Pas de statistiques disponibles' })
  @ApiTooManyRequestsResponse({ description: 'Trop de requêtes simultanées. Réessayez plus tard.' })
  @ApiProduces('application/json')
  @Header('content-type', 'application/json')
  @Get()
  async getStatDocuments(): Promise<Record<string, number>> {
    return await this.StatisticsService.findStat()
  }
}
