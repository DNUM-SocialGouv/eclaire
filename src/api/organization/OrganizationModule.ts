import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FindOrganizationController } from './controllers/FindOrganizationController'
import { EsOrganizationRepository } from './gateways/EsOrganizationRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'

@Module({
  controllers: [FindOrganizationController],
  imports: [ConfigModule, ElasticsearchModule],
  providers: [EsOrganizationRepository],
})
export class OrganizationModule {}
