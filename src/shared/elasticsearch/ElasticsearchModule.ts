import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from '@opensearch-project/opensearch'

import { ElasticsearchConfig } from './ElasticsearchConfig'
import { ElasticsearchService } from './ElasticsearchService'

@Module({
  exports: [ElasticsearchService],
  providers: [
    {
      inject: [ConfigService],
      provide: ElasticsearchConfig,
      useFactory: (configService: ConfigService): ElasticsearchConfig => {
        return new ElasticsearchConfig(configService)
      },
    },
    {
      inject: [ElasticsearchConfig],
      provide: ElasticsearchService,
      useFactory: (elasticsearchConfig: ElasticsearchConfig): ElasticsearchService => {
        const client = new Client(elasticsearchConfig.getClientOptions())

        return new ElasticsearchService(client)
      },
    },
  ],
})
export class ElasticsearchModule {}
