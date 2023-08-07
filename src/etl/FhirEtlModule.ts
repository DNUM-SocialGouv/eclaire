import { Module } from '@nestjs/common'

import { FhirEtlService } from './FhirEtlService'
import { ReaderModule } from './reader/ReaderModule'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { LoggerModule } from '../shared/logger/LoggerModule'

@Module({
  imports: [LoggerModule, ElasticsearchModule, ReaderModule],
  providers: [FhirEtlService],
})

export class FhirEtlModule {}
