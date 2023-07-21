import { Client, RequestParams } from '@elastic/elasticsearch'
import { RequestBody } from '@elastic/elasticsearch/lib/Transport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElasticsearchService {
  private readonly index = 'eclaire'
  private readonly type = '_doc'

  constructor(private readonly client: Client) {}

  async createAnIndex<T>(mappings: T): Promise<void> {
    await this.client.indices.create({
      body: { mappings },
      index: this.index,
    } satisfies RequestParams.IndicesCreate)
  }

  async deleteAnIndex(): Promise<void> {
    await this.client.indices.delete({ index: this.index } satisfies RequestParams.IndicesDelete)
  }

  async updateAnIndex<T>(mappings: T): Promise<void> {
    await this.client.indices.putMapping({
      body: mappings,
      index: this.index,
    } satisfies RequestParams.IndicesPutMapping)
  }

  async findOneDocument<T>(id: string): Promise<T> {
    const request = await this.client.get({
      id,
      index: this.index,
      type: this.type,
    } satisfies RequestParams.Get)

    return request.body._source as T
  }

  async bulkDocuments<T>(documents: T[]): Promise<void> {
    await this.client.bulk({
      body: documents,
      index: this.index,
      refresh: true,
    } satisfies RequestParams.Bulk)
  }

  async search(requestBody: RequestBody): Promise<SearchResponse> {
    const response = await this.client.search({
      body: requestBody,
      index: this.index,
    } satisfies RequestParams.Search)

    return {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      hits: response.body.hits.hits.map((hit) => hit._source),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      total: response.body.hits.total.value as number,
    }
  }
}

type SearchResponse = Readonly<{
  hits: []
  total: number
}>
