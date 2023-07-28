import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

export interface EtlShard {
  readonly logger: LoggerService
  readonly elasticsearchService: ElasticsearchService
  readonly riphDto: RiphDto[]

  import(): Promise<void>
  extract(): RiphDto[]
  transform(riphDto: RiphDto[]): ResearchStudyElasticsearchDocument[]
  load(researchStudyModel: ResearchStudyElasticsearchDocument[]): Promise<void>
}

export type IndexElasticsearch = Readonly<{
  create: {
    _id: string
  }
}>

export type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto

export type ResearchStudyElasticsearchDocument = IndexElasticsearch | ResearchStudyModel
