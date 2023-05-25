import { Module } from '@nestjs/common'
import { readFileSync } from 'fs'
import { join } from 'path'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
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
        const riphCtisDto = JSON.parse(readFileSync(join(__dirname, '.data/export_eclair_ctis-22-05-2023.json'), 'utf8')) as RiphCtisDto[]
        const riphDmDto = JSON.parse(readFileSync(join(__dirname, '.data/export_eclair_dm-dmdiv-22-05-2023.json'), 'utf8')) as RiphDmDto[]
        const riphJardeDto1 = JSON.parse(readFileSync(join(__dirname, '.data/export_eclair_riph1-22-05-2023.json'), 'utf8')) as RiphJardeDto[]
        const riphJardeDto2 = JSON.parse(readFileSync(join(__dirname, '.data/export_eclair_riph2-22-05-2023.json'), 'utf8')) as RiphJardeDto[]

        return new EtlService(logger, elasticsearchService, riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2)
      },
    },
  ],
})
export class EtlModule {}
