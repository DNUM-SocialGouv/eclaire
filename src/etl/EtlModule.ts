import { Module } from '@nestjs/common'

import { EtlService } from './EtlService'
import { ReaderModule } from './reader/ReaderModule'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { LoggerModule } from '../shared/logger/LoggerModule'

@Module({
  imports: [LoggerModule, ElasticsearchModule, ReaderModule],
  providers: [EtlService],
})

export class EtlModule {}
