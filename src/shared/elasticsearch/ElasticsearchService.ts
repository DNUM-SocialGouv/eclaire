import { Client, errors, RequestParams } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

import { ElasticsearchServiceError } from './ElasticsearchServiceError'

@Injectable()
export class ElasticsearchService {
  private readonly index = 'eclaire'
  private readonly type = '_doc'

  constructor(private readonly client: Client) {}

  async createAnIndex<T>(mappings: T): Promise<void> {
    try {
      await this.client.indices.create({
        body: { mappings },
        index: this.index,
      } satisfies RequestParams.IndicesCreate)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new ElasticsearchServiceError(error.meta.body.error.reason as string)
      }

      throw error
    }
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
    try {
      await this.client.bulk({
        body: documents,
        index: this.index,
        refresh: true,
      } satisfies RequestParams.Bulk)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new ElasticsearchServiceError(error.meta.body.error.reason as string)
      }

      throw error
    }
  }
}
