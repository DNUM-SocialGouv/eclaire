import { Client } from '@elastic/elasticsearch'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { eSClientConfigLocal, eSClientConfigProduction } from './elasticsearch.config'
import { ElasticsearchController } from './elasticsearch.controller'
import { ElasticsearchService } from './elasticsearch.service'

@Module({
  controllers: [ElasticsearchController],
  exports: [ElasticsearchService],
  providers: [
    ElasticsearchService,
    {
      inject: [ConfigService],
      provide: Client,
      useFactory: (configService: ConfigService) => {
        return new Client(
          configService.get('NODE_ENV') === 'production' ? eSClientConfigProduction : eSClientConfigLocal
        )
      },
    },
  ],
})
export class ElasticsearchModule {}
