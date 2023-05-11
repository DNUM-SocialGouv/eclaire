import { Module } from '@nestjs/common'

import { GetOneClinicalTrialController } from './controllers/get-one-clinical-trial.controller'
import { EsClinicalTrialRepository } from './gateways/es-repository/es-clinical-trial.repository'
import { ElasticsearchModule } from '../../shared/elasticsearch/elasticsearch.module'
import { ElasticsearchService } from '../../shared/elasticsearch/elasticsearch.service'

@Module({
  controllers: [GetOneClinicalTrialController],
  imports: [ElasticsearchModule],
  providers: [
    {
      inject: [ElasticsearchService],
      provide: EsClinicalTrialRepository,
      useFactory: (elasticsearchService: ElasticsearchService) => {
        return new EsClinicalTrialRepository(elasticsearchService)
      },
    },
  ],
})
export class ClinicalTrialModule {}
