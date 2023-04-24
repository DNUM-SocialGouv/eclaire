import { Module } from '@nestjs/common'

import { GetOneClinicalTrialController } from './controllers/get-one-clinical-trial.controller'
import { ClinicalTrialElasticRepository } from './gateways/elastic-repository/clinical-trial-elastic.repository'
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module'

@Module({
  controllers: [GetOneClinicalTrialController],
  imports: [ElasticsearchModule],
  providers: [ClinicalTrialElasticRepository],
})
export class ClinicalTrialModule {}
