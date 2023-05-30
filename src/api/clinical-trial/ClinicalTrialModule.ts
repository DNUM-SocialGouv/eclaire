import { Module } from '@nestjs/common'

import { GetOneClinicalTrialController } from './controllers/GetOneClinicalTrialController'
import { SearchClinicalTrialsController } from './controllers/SearchClinicalTrialsController'
import { EsClinicalTrialRepository } from './gateways/es-repository/EsClinicalTrialRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'

@Module({
  controllers: [GetOneClinicalTrialController, SearchClinicalTrialsController],
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
