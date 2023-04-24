import { ApiResponse, Client } from '@elastic/elasticsearch'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import crypto from 'crypto'

import { ElasticsearchServiceErrorsException } from './elasticsearch-component-exception'
import { ClinicalTrialModel } from '../clinical-trial/gateways/model/ClinicalTrialModel'

@Injectable()
export class ElasticsearchService {
  private readonly defaultMeta = { 'eclaire-esclient-version': '0.1' }
  private readonly index: string = 'eclaire'
  private readonly type: string = 'clinicaltrial'

  constructor(private readonly client: Client) {}

  async findOneClinicalTrial(id: string): Promise<Partial<ClinicalTrialModel>> {
    try {
      const result: ApiResponse = await this.client.get({
        id: id,
        index: this.index,
        type: this.type,
      },
      { context: { meta: this.defaultMeta }, opaqueId: 'findOneClinicalTrial' })

      this.handleResponseErrors(result)
      return result.body._source
    } catch (error) {
      if (
        error instanceof Error
        && error.hasOwnProperty('meta')
        && error['meta'].hasOwnProperty('statusCode')
        && error['meta']['statusCode'] === 404
      ) {
        throw new NotFoundException()
      }

      throw error
    }
  }

  async createOneClinicalTrial(payload: object): Promise<{ result: string, id: string }> {
    const uuid = crypto.randomUUID()
    if (payload.hasOwnProperty('uuid')) payload['uuid'] = uuid

    const request = await this.client.index({
      body: payload,
      id: uuid,
      index: this.index,
      type: this.type,
    },
    { context: { meta: this.defaultMeta }, opaqueId: 'createOneClinicalTrial' })

    this.handleResponseErrors(request)
    return { id: request.body._id as string, result: request.body.result as string }
  }

  async updateOneClinicalTrial(id: string, payload: object): Promise<{ result: string, id: string }> {
    try {
      const request = await this.client.update({
        body: { doc: payload },
        id: id,
        index: this.index,
        type: this.type,
      },
      { context: { meta: this.defaultMeta }, opaqueId: 'updateOneClinicalTrial' })

      this.handleResponseErrors(request)
      return { id: request.body._id as string, result: request.body.result as string }
    } catch (error) {
      if (
        error instanceof Error
        && error.name === 'ResponseError'
        && error.message === 'document_missing_exception'
      ) {
        throw new NotFoundException()
      }

      throw error
    }
  }

  async deleteOneClinicalTrial(id: string): Promise<{ result: string, id: string }> {
    const request = await this.client.delete({
      id: id,
      index: this.index,
      type: this.type,
    },
    { context: { meta: this.defaultMeta }, opaqueId: 'deleteOneClinicalTrial' })

    this.handleResponseErrors(request)
    return { id: request.body._id as string, result: request.body.result as string }
  }

  handleResponseErrors(response: ApiResponse): void {
    switch (response.statusCode) {
      case HttpStatus.OK:
      case HttpStatus.CREATED:
      case HttpStatus.ACCEPTED:
      case HttpStatus.NO_CONTENT:
        break
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException()
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException()
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException()
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException()
      case HttpStatus.CONFLICT:
        throw new ConflictException()
      default:
        throw new ElasticsearchServiceErrorsException(`An unhandled error occurred - elasticsearch.service [${response.statusCode.toString()}]`, 500)
    }
  }
}
