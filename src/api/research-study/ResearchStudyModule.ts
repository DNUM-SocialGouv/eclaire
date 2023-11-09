import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ResearchStudyRepository } from './application/ResearchStudyRepository'
import { GetOneResearchStudyController } from './controllers/GetOneResearchStudyController'
import { SearchResearchStudyController } from './controllers/SearchResearchStudyController'
import { EsResearchStudyRepository } from './gateways/EsResearchStudyRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'

@Module({
  controllers: [GetOneResearchStudyController, SearchResearchStudyController],
  imports: [ElasticsearchModule],
  providers: [
    {
      inject: [ElasticsearchService, ConfigService],
      provide: 'ResearchStudyRepository',
      useFactory: (databaseService: ElasticsearchService, configService: ConfigService): ResearchStudyRepository => {
        return new EsResearchStudyRepository(databaseService, configService)
      },
    },
  ],
})
export class ResearchStudyModule {}
