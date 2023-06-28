import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { GetOneReasearchStudyController } from './controllers/GetOneReasearchStudyController'
import { SearchResearchStudyController } from './controllers/SearchResearchStudyController'
import { EsResearchStudyRepository } from './gateways/EsResearchStudyRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'

@Module({
  controllers: [GetOneReasearchStudyController, SearchResearchStudyController],
  imports: [ConfigModule, ElasticsearchModule],
  providers: [EsResearchStudyRepository],
})
export class ResearchStudyModule {}
