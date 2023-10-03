import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { FindLocationController } from './controllers/FindLocationController'
import { EsLocationRepository } from './gateways/EsLocationRepository'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'

@Module({
  controllers: [FindLocationController],
  imports: [ConfigModule, ElasticsearchModule],
  providers: [EsLocationRepository],
})
export class LocationModule {}
