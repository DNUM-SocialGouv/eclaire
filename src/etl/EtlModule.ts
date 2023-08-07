import { Module } from '@nestjs/common'

import { EtlService } from './EtlService'
import { FileReaderModule } from './file-reader/FileReaderModule'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { LoggerModule } from '../shared/logger/LoggerModule'

@Module({
  imports: [LoggerModule, ElasticsearchModule, FileReaderModule],
  providers: [EtlService],
})

export class EtlModule {}
