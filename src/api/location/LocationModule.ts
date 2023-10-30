import { Module } from '@nestjs/common'

import { LocationRepository } from './application/contracts/LocationRepository'
import { FindLocationController } from './controllers/FindLocationController'
import { EsLocationRepository } from './gateways/EsLocationRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'

@Module({
  controllers: [FindLocationController],
  imports: [ElasticsearchModule],
  providers: [
    {
      inject: [ElasticsearchService],
      provide: 'LocationRepository',
      useFactory: (databaseService: ElasticsearchService): LocationRepository => {
        return new EsLocationRepository(databaseService)
      },
    },
  ],
})
export class LocationModule {}
