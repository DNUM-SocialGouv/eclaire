import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FindGroupController } from './controllers/FindGroupController'
import { EsGroupRepository } from './gateways/EsGroupRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'

@Module({
  controllers: [FindGroupController],
  imports: [ConfigModule, ElasticsearchModule],
  providers: [EsGroupRepository],
})
export class GroupModule {}
