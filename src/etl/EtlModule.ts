import { Module } from '@nestjs/common'

import { EtlService } from './EtlService'
import { S3Module } from './s3/S3Module'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { LoggerModule } from '../shared/logger/LoggerModule'

@Module({
  imports: [LoggerModule, ElasticsearchModule, S3Module],
  providers: [EtlService],
})
export class EtlModule {}
