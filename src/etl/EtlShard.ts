import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

export interface EtlShard {
  readonly logger: LoggerService
  readonly elasticsearchService: ElasticsearchService
  readonly riphDtos: RiphDto[]

  import(): Promise<void>
  extract(): RiphDto[]
  transform(riphDtos: RiphDto[]): ResearchStudyElasticsearchDocument[]
  load(documents: ResearchStudyElasticsearchDocument[]): Promise<void>
}

export type IndexElasticsearch = Readonly<{
  create: {
    _id: string
  }
}>

export type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto

export type ResearchStudyElasticsearchDocument = IndexElasticsearch | ResearchStudyModel
