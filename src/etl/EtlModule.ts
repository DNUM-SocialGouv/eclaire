import { Module } from '@nestjs/common'

import riphCtisDto from './.data/export_eclair_ctis.json'
import riphDmDto from './.data/export_eclair_dm-dmdiv.json'
import riphJardeDto1 from './.data/export_eclair_riph1.json'
import riphJardeDto2 from './.data/export_eclair_riph2.json'
import { EtlService } from './EtlService'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerModule } from '../shared/logger/LoggerModule'
import { LoggerService } from '../shared/logger/LoggerService'

@Module({
  imports: [LoggerModule, ElasticsearchModule],
  providers: [
    {
      inject: [LoggerService, ElasticsearchService],
      provide: EtlService,
      useFactory: (logger: LoggerService, elasticsearchService: ElasticsearchService): EtlService => {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return new EtlService(logger, elasticsearchService, riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2)
      },
    },
  ],
})
export class EtlModule {}
