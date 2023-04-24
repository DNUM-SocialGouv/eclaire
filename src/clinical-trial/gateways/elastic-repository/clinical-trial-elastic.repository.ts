import { Injectable } from '@nestjs/common'

import { ClinicalTrialModelFactory } from '../../../elasticsearch/clinical-trial-model-factory'
import { ElasticsearchService } from '../../../elasticsearch/elasticsearch.service'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { ClinicalTrialRepository } from '../../application/interfaces/ClinicalTrialRepository'
import { ClinicalTrialFactory } from '../clinical-trial-factory'

@Injectable()
export class ClinicalTrialElasticRepository implements ClinicalTrialRepository {
  constructor(private readonly elastic: ElasticsearchService) {
  }

  async findOne(uuid: string): Promise<ClinicalTrial> {
    const model = await this.elastic.findOneClinicalTrial(uuid)
    return ClinicalTrialFactory.create(ClinicalTrialModelFactory.create(model))
  }
}
