import { Module } from '@nestjs/common'

import { OrganizationRepository } from './application/contracts/OrganizationRepository'
import { FindOrganizationController } from './controllers/FindOrganizationController'
import { EsOrganizationRepository } from './gateways/EsOrganizationRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'

@Module({
  controllers: [FindOrganizationController],
  imports: [ElasticsearchModule],
  providers: [
    {
      inject: [ElasticsearchService],
      provide: 'OrganizationRepository',
      useFactory: (databasechService: ElasticsearchService): OrganizationRepository => {
        return new EsOrganizationRepository(databasechService)
      },
    },
  ],
})
export class OrganizationModule {}
