import { Injectable } from '@nestjs/common'

import { ElasticsearchService } from '../../../../shared/elasticsearch/elasticsearch.service'
import { ElasticsearchServiceNotFound } from '../../../../shared/elasticsearch/ElasticsearchServiceNotFound'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { NotFoundClinicalTrialException } from '../../application/Exceptions/NotFoundClinicalTrialException'
import { ClinicalTrialRepository } from '../../application/interfaces/ClinicalTrialRepository'
import { ClinicalTrialFactory } from '../clinical-trial-factory'
import { ClinicalTrialModelFactory } from '../clinical-trial-model-factory'

@Injectable()
export class EsClinicalTrialRepository implements ClinicalTrialRepository {
  constructor(private readonly service: ElasticsearchService) {
  }

  async findOne(uuid: string): Promise<ClinicalTrial> {
    let clinicalTrialModel = undefined
    try {
      const clinicalTrialPayload = await this.service.findOneDocument(uuid)
      clinicalTrialModel = ClinicalTrialModelFactory.create(clinicalTrialPayload)

      if (clinicalTrialModel === undefined) {
        throw new NotFoundClinicalTrialException()
      }
      // console.log(ClinicalTrialFactory.create(clinicalTrialModel))
      return ClinicalTrialFactory.create(clinicalTrialModel)
    } catch (error) {
      if (error instanceof ElasticsearchServiceNotFound) {
        throw new NotFoundClinicalTrialException()
      }

      console.log(error)
      throw new NotFoundClinicalTrialException()
    }

  }
}
