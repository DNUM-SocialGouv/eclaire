import { errors } from '@elastic/elasticsearch'
import { RequestBody } from '@elastic/elasticsearch/lib/Transport'
import { Injectable } from '@nestjs/common'

import { ElasticsearchService } from '../../../../shared/elasticsearch/ElasticsearchService'
import { ClinicalTrialModel } from '../../../../shared/models/ClinicalTrialModel'
import { ClinicalTrialRepository } from '../../application/contracts/ClinicalTrialRepository'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { SearchResponse } from '../../application/entities/SearchResponse'
import { NotFoundClinicalTrialError } from '../../application/errors/NotFoundClinicalTrialError'
import { ClinicalTrialFactory } from '../ClinicalTrialFactory'

@Injectable()
export class EsClinicalTrialRepository implements ClinicalTrialRepository {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async findOne(id: string): Promise<ClinicalTrial> {
    try {
      const clinicalTrialModel = await this.elasticsearchService.findOneDocument<ClinicalTrialModel>(id)

      return ClinicalTrialFactory.create(clinicalTrialModel)
    } catch (error) {
      if (error instanceof errors.ResponseError && error.meta.statusCode === 404) {
        throw new NotFoundClinicalTrialError(id)
      } else {
        throw error
      }
    }
  }

  async search(requestBody: RequestBody): Promise<SearchResponse> {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.elasticsearchService.search(requestBody)

      return {
        hits: response.hits.map((hit): ClinicalTrial => ClinicalTrialFactory.create(hit)),
        total: response.total,
      }
    } catch (error) {
      throw error
    }
  }
}
