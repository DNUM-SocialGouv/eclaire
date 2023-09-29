import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { GetOneResearchStudyController } from './controllers/GetOneResearchStudyController'
import { SearchResearchStudyController } from './controllers/SearchResearchStudyController'
import { EsResearchStudyRepository } from './gateways/EsResearchStudyRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'

@Module({
  controllers: [GetOneResearchStudyController, SearchResearchStudyController],
  imports: [ConfigModule, ElasticsearchModule],
  providers: [EsResearchStudyRepository],
})
export class ResearchStudyModule {}
