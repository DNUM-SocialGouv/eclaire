import { Module } from '@nestjs/common'

import { FhirEtlService } from './FhirEtlService'
import { ElasticsearchModule } from '../shared/elasticsearch/ElasticsearchModule'
import { LoggerModule } from '../shared/logger/LoggerModule'
import { ReaderModule } from '../shared/reader/ReaderModule'

@Module({
  imports: [LoggerModule, ElasticsearchModule, ReaderModule],
  providers: [FhirEtlService],
})

export class FhirEtlModule {}
