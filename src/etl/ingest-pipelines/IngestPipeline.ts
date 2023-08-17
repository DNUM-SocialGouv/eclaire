import { ResearchStudy } from 'fhir/r4'

import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../shared/logger/LoggerService'
import { RiphCtisDto } from '../dto/RiphCtisDto'
import { RiphDmDto } from '../dto/RiphDmDto'
import { RiphJardeDto } from '../dto/RiphJardeDto'
import { FileReaderService } from '../file-reader/FileReaderService'

const EXPORT_DATE = '27-07-2023'

export abstract class IngestPipeline {
  protected abstract readonly type: string

  constructor(
    protected readonly logger: LoggerService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly readerService: FileReaderService
  ) {}

  abstract execute(): Promise<void>
  abstract transform(riphDtos: RiphDto[]): ResearchStudyElasticsearchDocument[]

  extract<T>(): T[] {
    const dto: T[] = this.readerService.read(`export_eclaire_${this.type}-${EXPORT_DATE}.json`) as T[]
    this.logger.info(`[Extract] ${dto.length} (${this.type})`)
    return [...dto]
  }

  async load(documents: ResearchStudyElasticsearchDocument[]): Promise<void> {
    await this.elasticsearchService.bulkDocuments<ResearchStudyElasticsearchDocument>(documents)
  }
}

export type IndexElasticsearch = Readonly<{
  create: {
    _id: string
  }
}>

type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto

export type ResearchStudyElasticsearchDocument = IndexElasticsearch | ResearchStudy
