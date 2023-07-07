import { Module } from '@nestjs/common'
import { readFileSync } from 'fs'
import { join } from 'path'

import { EtlService } from './EtlService'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'
import { LoggerModule } from '../../shared/logger/LoggerModule'
import { LoggerService } from '../../shared/logger/LoggerService'
import { RiphCtisDto } from '../dto/RiphCtisDto'

const EXPORT_DATE = '15-06-2023'

@Module({
  imports: [LoggerModule, ElasticsearchModule],
  providers: [
    {
      inject: [LoggerService, ElasticsearchService],
      provide: EtlService,
      useFactory: (logger: LoggerService, elasticsearchService: ElasticsearchService): EtlService => {
        const riphCtisDto = JSON.parse(readFileSync(join(__dirname, '../.data/export_eclaire_ctis-' + EXPORT_DATE + '.json'), 'utf8')) as RiphCtisDto[]

        return new EtlService(logger, elasticsearchService, riphCtisDto)
      },
    },
  ],
})
export class EtlModule {}
