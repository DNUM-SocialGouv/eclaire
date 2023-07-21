import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

export interface EtlShard {
  readonly logger: LoggerService
  readonly elasticsearchService: ElasticsearchService
  readonly dto: RiphDto[]

  import()
  extract(dto: RiphDto[]): RiphDto[]
  transform(clinicalTrialsDto: RiphDto[]): (IndexElasticsearch | ResearchStudyModel)[]
  load(researchStudyModel: (IndexElasticsearch | ResearchStudyModel)[]): Promise<void>
}

export type IndexElasticsearch = Readonly<{
  create: {
    _id: string
  }
}>

export type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto
