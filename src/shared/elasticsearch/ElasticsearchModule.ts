import { Client } from '@elastic/elasticsearch'
import { Module } from '@nestjs/common'

import { ElasticsearchConfig } from './ElasticsearchConfig'
import { ElasticsearchService } from './ElasticsearchService'

@Module({
  exports: [ElasticsearchService],
  providers: [
    ElasticsearchConfig,
    {
      inject: [ElasticsearchConfig],
      provide: Client,
      useFactory: (elasticsearchConfig: ElasticsearchConfig): Client => {
        return new Client(elasticsearchConfig.getClientOptions())
      },
    },
    ElasticsearchService,
  ],
})
export class ElasticsearchModule {}