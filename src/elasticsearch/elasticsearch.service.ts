import { ApiResponse, Client } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'
import crypto from 'crypto'

@Injectable()
export class ElasticsearchService {
  private readonly defaultMeta = { 'eclaire-esclient-version': '0.1' }

  constructor(private readonly client: Client) {}

  async findOne(index: string, type: string, id: string): Promise<ApiResponse> {
    return this.client.mget({
      body: { ids: [id] },
      index: index,
      type: type,
    },
    { context: { meta: this.defaultMeta }, opaqueId: 'findOne' })
  }

  async createOne(index: string, type: string, payload: object): Promise<ApiResponse> {
    const uuid = crypto.randomUUID()
    if (payload.hasOwnProperty('uuid')) payload['uuid'] = uuid

    return this.client.index({
      body: payload,
      id: uuid,
      index: index,
      type: type,
    },
    { context: { meta: this.defaultMeta }, opaqueId: 'createOne' })
  }

  updateOne(index: string, id: string, payload: object): Promise<ApiResponse> {
    return this.client.update({
      body: { doc: payload },
      id: id,
      index: index,
    },
    { context: { meta: this.defaultMeta }, opaqueId: 'updateOne' })
  }

  deleteOne(index: string, id: string): Promise<ApiResponse> {
    return this.client.delete({
      id: id,
      index: index,
    },
    { context: { meta: this.defaultMeta }, opaqueId: 'deleteOne' })
  }
}
