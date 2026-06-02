import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../../shared/models/eclaire/ModelUtils'
import { RiphCtisDto } from '../../dto/RiphCtisDto'
import { RiphDmDto } from '../../dto/RiphDmDto'
import { RiphJardeDto } from '../../dto/RiphJardeDto'
import { JsonFileReaderService } from '../../json-file-reader/JsonFileReaderService'
import { S3Service } from '../../s3/S3Service'

export abstract class IngestPipeline {
  protected abstract readonly type: string
  protected readonly startingDate: string

  constructor(
    protected readonly logger: LoggerService,
    private readonly databaseService: ElasticsearchService,
    private readonly readerService: S3Service | JsonFileReaderService,
    startingDate?: string
  ) {
    if (startingDate) {
      this.startingDate = ModelUtils.convertDateToIsoFormatWithoutTime(new Date(startingDate))
    } else {
      this.startingDate = ModelUtils.getDateOfYesterdayInIsoFormatAndWithoutTime()
    }
  }

  abstract execute(): Promise<void>
  abstract import(): Promise<void>
  abstract transform(riphDtos: RiphDto[]): ResearchStudyModel[]

  async extract<T>(typeOverride?: string): Promise<T[]> {
    const fileType = typeOverride ?? this.type
    const fileName = `export_eclaire_${fileType}.json`
    const dto: T[] = await this.readerService.read(fileName) as T[]
    this.logger.info(`[Extract] ${dto.length} (${fileType})`)
    return [...dto]
  }

  async *extractStream<T>(typeOverride?: string): AsyncGenerator<T> {
    const fileType = typeOverride ?? this.type
    const fileName = `export_eclaire_${fileType}.json`
    yield* this.readerService.readStream<T>(fileName)
  }

  async load(documents: ResearchStudyModel[]): Promise<void> {
    if (documents.length > 0) {
      await this.databaseService.bulkDocuments<ResearchStudyModel>(documents)
    }
  }

  async delete(ids: string[]): Promise<void> {
    if (ids.length > 0) {
      await this.databaseService.deleteManyDocument(ids)
    }
  }

  // -----------------------------
  // GENERIC BATCH ENGINE
  // -----------------------------
  protected async processInBatches<T>(
    stream: AsyncIterable<T>,
    batchSize: number,
    handler: (batch: T[]) => Promise<void>
  ): Promise<number> {
    let buffer: T[] = []
    let count = 0

    for await (const record of stream) {
      buffer.push(record)
      count++

      if (buffer.length === batchSize) {
        await handler(buffer)
        buffer = []
      }
    }

    if (buffer.length > 0) {
      await handler(buffer)
    }

    return count
  }

  // -----------------------------
  // SHARED POST-PROCESSING
  // -----------------------------
  protected async handleBatch(
    label: string,
    buffer: any[],
    transform: (data: any[]) => ResearchStudyModel[],
    idsToDelete: (string | null)[]
  ): Promise<void> {
    if (!buffer.length) return

    this.logger.info(`---- ${label} Processing batch of ${buffer.length} records`)

    const documents = transform(buffer)

    this.logger.info(
      `---- Chunk ${label}: number of documents to update : ${documents.length}`
    )

    if (documents.length > 0) {
      await this.load(documents)
    }

    const filteredIds = idsToDelete.filter((v) => v !== null)

    if (filteredIds.length > 0) {
      await this.delete(filteredIds)
    }

    this.logger.info(
      `////// Chunk ${label}: number of documents to delete : ${idsToDelete.length}`
    )
  }

  // -----------------------------
  // DATE FILTER (shared logic)
  // -----------------------------
  protected filterByDate(models: ResearchStudyModel[]): ResearchStudyModel[] {
    const startingDate = new Date(this.startingDate)

    return models.filter((model) => {
      const lastUpdated = new Date(model.meta.lastUpdated)
      return (
        lastUpdated >= startingDate
      )
    })
  }

}

type RiphDto = RiphCtisDto | RiphDmDto | RiphJardeDto
