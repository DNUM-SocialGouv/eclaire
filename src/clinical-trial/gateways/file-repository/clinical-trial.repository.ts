import { Injectable, NotFoundException } from '@nestjs/common'

import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { StudyType } from '../../application/entities/StudyType'
import { Title } from '../../application/entities/Title'
import { ClinicalTrialRepository } from '../../application/interfaces/ClinicalTrialRepository'
import { RecruitmentStatus } from '../../application/RecruitmentStatus'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'

@Injectable()
export class DbClinicalTrialRepository implements ClinicalTrialRepository {
  private readonly clinicalTrialsRepository: ClinicalTrialModel[] = []

  constructor(clinicalTrialsModel: ClinicalTrialModel[]) {
    clinicalTrialsModel.forEach((clinicalTrialModel) => {
      this.clinicalTrialsRepository.push(new ClinicalTrialModel(clinicalTrialModel))
    })
  }

  findOne(uuid: string): ClinicalTrial {
    const clinicalTrialModel = this.clinicalTrialsRepository.find((clinicalTrial) => clinicalTrial.uuid === uuid)

    if (!clinicalTrialModel) {
      throw new NotFoundException()
    }

    return this.buildClinicalTrialEntity(clinicalTrialModel)
  }

  private buildClinicalTrialEntity(clinicalTrialModel: ClinicalTrialModel): ClinicalTrial {
    return new ClinicalTrial({
      public_title: new Title(clinicalTrialModel.public_title as Partial<Title>),
      recruitment_status: clinicalTrialModel.recruitment_status as RecruitmentStatus,
      scientific_title: new Title(clinicalTrialModel.scientific_title as Partial<Title>),
      study_type: new StudyType(clinicalTrialModel.study_type as Partial<StudyType>),
    })
  }
}
