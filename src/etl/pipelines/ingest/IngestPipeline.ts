import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { S3Service } from '../../s3/S3Service'

export abstract class IngestPipeline {
  protected abstract readonly type: string

  constructor(
    protected readonly logger: LoggerService,
    private readonly databaseService: ElasticsearchService,
    private readonly readerService: S3Service
  ) {}

  abstract execute(): Promise<void>
  abstract transform(riphDtos: RiphDto[]): ResearchStudyModel[]

  async extract<T>(): Promise<T[]> {
    const fileName = `export_eclaire_${this.type}.json`
    const dto: T[] = await this.readerService.read(fileName) as T[]
    this.logger.info(`[Extract] ${dto.length} (${this.type})`)
    return [...dto]
  }

  async load(documents: ResearchStudyModel[]): Promise<void> {
    await this.databaseService.bulkDocuments<ResearchStudyModel>(documents)
  }
}

type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto
