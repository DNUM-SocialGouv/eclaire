import { Injectable } from '@nestjs/common'

import { IndexMapping } from './config/indexMapping'
import { RiphCtisDto } from './gateways/dto/RiphCtisDto'
import { RiphDmDto } from './gateways/dto/RiphDmDto'
import { RiphJardeDto } from './gateways/dto/RiphJardeDto'
import { RiphCtisClinicalTrialModelFactory } from './gateways/RiphCtisClinicalTrialModelFactory'
import { RiphDmClinicalTrialModelFactory } from './gateways/RiphDmClinicalTrialModelFactory'
import { RiphJardeClinicalTrialModelFactory } from './gateways/RiphJardeClinicalTrialModelFactory'
import { ClinicalTrialModel } from '../../api/clinical-trial/gateways/model/ClinicalTrialModel'
import { ElasticsearchService } from '../../shared/elasticsearch/elasticsearch.service'

@Injectable()
export class RiphService {
  constructor(
      private readonly elasticsearchService: ElasticsearchService,
      private readonly data_ctis,
      private readonly data_dm,
      private readonly data_jarde
  ) { }

  async imports(): Promise<void> {
    console.log('-- Début de l\'import des essais cliniques du RIPH...')
    const jarde = this.data_jarde as RiphJardeDto[]
    const ctis = this.data_ctis as RiphCtisDto[]
    const dm = this.data_dm as RiphDmDto[]

    console.log(`CTIS: ${String(ctis.length)}\nDM: ${String(dm.length)}\nJARDE: ${String(jarde.length)}`)

    const clinicalTrialsModels = [
      ...ctis.map((item) => RiphCtisClinicalTrialModelFactory.create(item)),
      ...dm.map((item) => RiphDmClinicalTrialModelFactory.create(item)),
      ...jarde.map((item) => RiphJardeClinicalTrialModelFactory.create(item)),
    ]
    if (!clinicalTrialsModels.length) {
      console.log('Aucun essais clinique à importer n\'a été trouvé')
      return
    }

    console.log(`Total à importer : ${clinicalTrialsModels.length}`)
    await this.elasticsearchService.createAnIndice(IndexMapping.clinicaltrial())

    const clinicalTrialsPayLoad = clinicalTrialsModels.flatMap((doc: ClinicalTrialModel) => [{ index: { _id: doc.uuid, _index: 'eclaire' } }, doc])
    await this.elasticsearchService.bulkDocuments(clinicalTrialsPayLoad)
    console.log('-- Fin de l\'import des essais cliniques du RIPH.')
  }
}
