import { Module } from '@nestjs/common'

import { EtlService } from './EtlService'
import { S3Module } from './s3/S3Module'
import { S3Service } from './s3/S3Service'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerModule } from '../shared/logger/LoggerModule'
import { LoggerService } from '../shared/logger/LoggerService'

@Module({
  imports: [LoggerModule, ElasticsearchModule, S3Module],
  providers: [
    {
      inject: [LoggerService, ElasticsearchService, S3Service],
      provide: EtlService,
      useFactory: (loggerService: LoggerService, databaseService: ElasticsearchService, readerService: S3Service): EtlService => {
        return new EtlService(loggerService, databaseService, readerService)
      },
    },
  ],
})
export class EtlModule {}
