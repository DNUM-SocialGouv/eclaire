import { errors } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

import { ElasticsearchService } from '../../../../shared/elasticsearch/ElasticsearchService'
import { ClinicalTrialModel } from '../../../../shared/models/ClinicalTrialModel'
import { ClinicalTrialRepository } from '../../application/contracts/ClinicalTrialRepository'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
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
        throw new NotFoundClinicalTrialError()
      } else {
        throw error
      }
    }
  }
}
