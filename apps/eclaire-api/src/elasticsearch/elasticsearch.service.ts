import { Client } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

import { ElasticsearchServiceError } from './ElasticsearchServiceError'
import { ElasticsearchServiceNotFound } from './ElasticsearchServiceNotFound'

@Injectable()
export class ElasticsearchService {
  private readonly index = 'eclaire'
  private readonly type = 'clinicaltrial'

  constructor(private readonly client: Client) {}

  async createAnIndice<T>(mapping: T) {
    try {
      await this.client.indices.create({
        body: { mappings: mapping },
        index: this.index,
      },
      { ignore: [400] })
    } catch (error) {
      throw new ElasticsearchServiceError(error as string)
    }
  }

  async findOneDocument<T>(id: string): Promise<Partial<T>> {
    try {
      const request = await this.client.get({
        id,
        index: this.index,
        type: this.type,
      })

      if (request.body.found) {
        return request.body._source as T
      }
    } catch (error) {
      throw new ElasticsearchServiceError(error as string)
    }

    throw new ElasticsearchServiceNotFound()
  }

  async bulkDocuments<T>(documents: T[]) {
    try {
      await this.client.bulk({
        body: documents,
        index: this.index,
        refresh: true,
        type: this.type,
      })
    } catch (error) {
      throw new ElasticsearchServiceError(error as string)
    }
  }
}
