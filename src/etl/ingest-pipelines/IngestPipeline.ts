import { errors } from '@elastic/elasticsearch'

import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../shared/logger/LoggerService'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { RiphCtisDto } from '../dto/RiphCtisDto'
import { RiphDmDto } from '../dto/RiphDmDto'
import { RiphJardeDto } from '../dto/RiphJardeDto'
import { FileReaderService } from '../file-reader/FileReaderService'

const EXPORT_DATE = '27-07-2023'

export abstract class IngestPipeline {
  abstract readonly type: string;

  constructor(
    readonly logger: LoggerService,
    readonly elasticsearchService: ElasticsearchService,
    readonly readerService: FileReaderService
  ) {}

  abstract execute(): Promise<void>
  abstract transform(riphDtos: RiphDto[]): ResearchStudyElasticsearchDocument[]

  extract<T>(): T[] {
    const dto: T[] = this.readerService.read(`export_eclaire_${this.type}-${EXPORT_DATE}.json`) as T[]
    this.logger.info(`[Extract] ${dto.length} (${this.type})`)
    return [...dto]
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

type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto

export type ResearchStudyElasticsearchDocument = IndexElasticsearch | ResearchStudyModel
