import { Module } from '@nestjs/common'

import { GroupRepository } from './application/contracts/GroupRepository'
import { FindGroupController } from './controllers/FindGroupController'
import { EsGroupRepository } from './gateways/EsGroupRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'

@Module({
  controllers: [FindGroupController],
  imports: [ElasticsearchModule],
  providers: [
    {
      inject: [ElasticsearchService],
      provide: 'GroupRepository',
      useFactory: (databaseService: ElasticsearchService): GroupRepository => {
        return new EsGroupRepository(databaseService)
      },
    },
  ],
})
export class GroupModule {}
