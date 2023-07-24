import { DynamicModule, Module } from '@nestjs/common'
import { readFileSync } from 'fs'
import { join } from 'path'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { FhirEtlService } from './FhirEtlService'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerModule } from '../shared/logger/LoggerModule'
import { LoggerService } from '../shared/logger/LoggerService'

const EXPORT_DATE = '15-06-2023'

@Module({
  imports: [LoggerModule, ElasticsearchModule],
  providers: [
    {
      inject: [LoggerService, ElasticsearchService],
      provide: FhirEtlService,
      useFactory: (logger: LoggerService, elasticsearchService: ElasticsearchService): FhirEtlService => {
        const riphCtisDto = JSON.parse(readFileSync(join(__dirname, `.data/export_eclaire_ctis-${EXPORT_DATE}.json`), 'utf8')) as RiphCtisDto[]
        const riphDmDto = JSON.parse(readFileSync(join(__dirname, `.data/export_eclaire_dm-dmdiv-${EXPORT_DATE}.json`), 'utf8')) as RiphDmDto[]
        const riphJardeDto1 = JSON.parse(readFileSync(join(__dirname, `.data/export_eclaire_jarde1-${EXPORT_DATE}.json`), 'utf8')) as RiphJardeDto[]
        const riphJardeDto2 = JSON.parse(readFileSync(join(__dirname, `.data/export_eclaire_jarde2-${EXPORT_DATE}.json`), 'utf8')) as RiphJardeDto[]

        return new FhirEtlService(logger, elasticsearchService, riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2)
      },
    },
  ],
})

export class FhirEtlModule {
  static forRoot(): DynamicModule {
    return process.env.NODE_ENV === 'production'
      ? { module: undefined }
      : { module: FhirEtlModule }
  }
}
