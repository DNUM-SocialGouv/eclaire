import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'

export abstract class AbstractPipeline<T> {
  constructor(
    protected readonly databaseService: ElasticsearchService,
    protected readonly logger?: LoggerService
  ) {}

  async execute(date?: string): Promise<void> {
    await this.extract(date)
  }

  async extract(date?: string): Promise<T[]> {
    const requestBody = this.buildRequestBody(date)
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'] ?? '100')
    let searchAfter: any[] | undefined
    let results: T[] = []

    requestBody.size = chunkSize
    let from = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
      this.logger?.info(`---- Batch from: ${from}`)

      if (searchAfter) requestBody.search_after = searchAfter
      else delete requestBody.search_after

      const response: SearchResponse = await this.databaseService.search(requestBody, true)

      if (!response.hits?.length) break

      const data = response.hits.map((hit) => hit._source as T)
      const transformed = await this.transform(data)
      await this.load(transformed)

      searchAfter = response.hits.at(-1)?.sort
      results = data
      from += chunkSize
    }

    this.logger?.info('---- Pipeline finished')
    return results
  }

  // Méthodes abstraites spécifiques à chaque pipeline
  protected abstract buildRequestBody(date?: string): ElasticsearchBodyType
  protected abstract transform(data: T[]): Promise<T[]>

  async load(data: T[]): Promise<void> {
    await this.databaseService.bulkDocuments(data)
  }
}
