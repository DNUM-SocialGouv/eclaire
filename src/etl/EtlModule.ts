import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as process from 'node:process'

import { EtlService } from './EtlService'
import { JsonFileReaderModule } from './json-file-reader/JsonFileReaderModule'
import { JsonFileReaderService } from './json-file-reader/JsonFileReaderService'
import { S3Module } from './s3/S3Module'
import { S3Service } from './s3/S3Service'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerModule } from '../shared/logger/LoggerModule'
import { LoggerService } from '../shared/logger/LoggerService'
import { TranslationModule } from '../shared/translation/TranslationModule'
import { TranslationService } from '../shared/translation/TranslationService'

@Module({
  imports: [LoggerModule, ElasticsearchModule, S3Module, JsonFileReaderModule, TranslationModule],
  providers: [
    {
      inject: [ConfigService, LoggerService, ElasticsearchService, TranslationService],
      provide: EtlService,
      useFactory: (
        configService: ConfigService,
        loggerService: LoggerService,
        databaseService: ElasticsearchService,
        translationService: TranslationService
      ): EtlService => {
        const readerService = process.env.NODE_ENV === 'dev'
          ? new JsonFileReaderService()
          : new S3Service(configService)
        return new EtlService(loggerService, databaseService, readerService, translationService)
      },
    },
  ],
})
export class EtlModule {}
