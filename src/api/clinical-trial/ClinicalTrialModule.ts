import { Module } from '@nestjs/common'

import { GetOneClinicalTrialController } from './controllers/GetOneClinicalTrialController'
import { EsClinicalTrialRepository } from './gateways/es-repository/EsClinicalTrialRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'

@Module({
  controllers: [GetOneClinicalTrialController],
  imports: [ElasticsearchModule],
  providers: [
    {
      inject: [ElasticsearchService],
      provide: EsClinicalTrialRepository,
      useFactory: (elasticsearchService: ElasticsearchService): EsClinicalTrialRepository => {
        return new EsClinicalTrialRepository(elasticsearchService)
      },
    },
  ],
})
export class ClinicalTrialModule {}
