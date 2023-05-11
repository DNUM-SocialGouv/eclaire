import { Module } from '@nestjs/common'

import data_ctis from './.data/export_eclair_riph_ctis.json'
import data_dm from './.data/export_eclair_riph_dm.json'
import data_jarde from './.data/export_eclair_riph_jarde.json'
import { RiphService } from './riph.service'
import { ElasticsearchModule } from '../../shared/elasticsearch/elasticsearch.module'
import { ElasticsearchService } from '../../shared/elasticsearch/elasticsearch.service'

@Module({
  imports: [ElasticsearchModule],
  providers: [
    {
      inject: [ElasticsearchService],
      provide: RiphService,
      useFactory: (service: ElasticsearchService) => {
        return new RiphService(service, data_ctis, data_dm, data_jarde)
      },
    },
  ],
})
export class RiphModule {}
