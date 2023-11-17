import { Module } from '@nestjs/common'

import { EtlService } from './EtlService'
import { S3Module } from './s3/S3Module'
import { S3Service } from './s3/S3Service'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerModule } from '../shared/logger/LoggerModule'
import { LoggerService } from '../shared/logger/LoggerService'
import { DeeplModule } from '../shared/translation/DeeplModule'
import { DeeplService } from '../shared/translation/DeeplService'

@Module({
  imports: [LoggerModule, ElasticsearchModule, S3Module, DeeplModule],
  providers: [
    {
      inject: [LoggerService, ElasticsearchService, S3Service, DeeplService],
      provide: EtlService,
      useFactory: (
        loggerService: LoggerService,
        databaseService: ElasticsearchService,
        readerService: S3Service,
        translationService: DeeplService
      ): EtlService => {
        return new EtlService(loggerService, databaseService, readerService, translationService)
      },
    },
  ],
})
export class EtlModule {}
