import { errors } from '@elastic/elasticsearch'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { ResearchStudyModel } from '../shared/models/fhir/ResearchStudyModel'

export abstract class EtlShard {
  constructor(
    readonly logger: LoggerService,
    readonly elasticsearchService: ElasticsearchService,
    readonly riphDtos: RiphDto[]
  ) {}

  abstract import(): Promise<void>
  abstract transform(riphDtos: RiphDto[]): ResearchStudyElasticsearchDocument[]

  extract<T>(): T[] {
    return [...this.riphDtos as T[]]
  }

  async load(documents: ResearchStudyElasticsearchDocument[]): Promise<void> {
    try {
      await this.elasticsearchService.bulkDocuments<ResearchStudyElasticsearchDocument>(documents)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(error.meta.body.error.reason as string)
      }
      throw error
    }
  }
}

export type IndexElasticsearch = Readonly<{
  create: {
    _id: string
  }
}>

export type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto

export type ResearchStudyElasticsearchDocument = IndexElasticsearch | ResearchStudyModel
