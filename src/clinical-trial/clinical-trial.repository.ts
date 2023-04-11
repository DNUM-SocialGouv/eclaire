import { Injectable, NotFoundException } from '@nestjs/common'

import { ClinicalTrial } from './entities/ClinicalTrial'
import { ClinicalTrialRepository } from './entities/ClinicalTrialRepository'
import { RecruitmentStatus } from './entities/RecruitmentStatus'
import { Title } from './entities/Title'
import { ClinicalTrialModel } from './model/ClinicalTrialModel'

@Injectable()
export class DbClinicalTrialRepository implements ClinicalTrialRepository {
  private readonly clinicalTrialsModel: ClinicalTrialModel[] = []

  constructor(clinicalTrialsModel: ClinicalTrialModel[]) {
    clinicalTrialsModel.forEach((clinicalTrialModel) => {
      this.clinicalTrialsModel.push(new ClinicalTrialModel(clinicalTrialModel))
    })
  }

  findOne(uuid: string): ClinicalTrial {
    const clinicalTrial = this.clinicalTrialsModel.find((clinicalTrial) => clinicalTrial.uuid === uuid)

    if (!clinicalTrial) {
      throw new NotFoundException()
    }

    return this.buildClinicalTrial(clinicalTrial)
  }

  private buildClinicalTrial(clinicalTrialModel: ClinicalTrialModel): ClinicalTrial {
    return new ClinicalTrial(
      new Title(clinicalTrialModel.public_title.value, clinicalTrialModel.public_title.acronym),
      new Title(clinicalTrialModel.scientific_title.value, clinicalTrialModel.scientific_title.acronym),
      clinicalTrialModel.recruitment_status as RecruitmentStatus
    )
  }
}
