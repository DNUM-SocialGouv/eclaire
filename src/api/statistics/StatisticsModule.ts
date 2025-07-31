import { Module } from '@nestjs/common'

import { StatisticsRepository } from './application/StatisticsRepository'
import { GetStatisticsController } from './controllers/GetStatisticsController'
import { EsStatisticsRepository } from './gateway/EsStatisticsRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'

@Module({
  controllers: [GetStatisticsController],
  imports: [ElasticsearchModule],
  providers: [
    {
      inject: [ElasticsearchService],
      provide: 'StatisticsRepository',
      useFactory: (databaseService: ElasticsearchService): StatisticsRepository => {
        return new EsStatisticsRepository(databaseService)
      },
    },
  ],
})
export class StatisticsModule { }
