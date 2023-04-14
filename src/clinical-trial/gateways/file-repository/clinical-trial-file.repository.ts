import { Injectable, NotFoundException } from '@nestjs/common'

import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { Recruitment } from '../../application/entities/Recruitment'
import { StudyType } from '../../application/entities/StudyType'
import { Title } from '../../application/entities/Title'
import { Gender } from '../../application/Gender'
import { ClinicalTrialRepository } from '../../application/interfaces/ClinicalTrialRepository'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'

@Injectable()
export class ClinicalTrialFileRepository implements ClinicalTrialRepository {
  private readonly clinicalTrialsRepository: ClinicalTrialModel[] = []

  constructor(clinicalTrialsModel: ClinicalTrialModel[]) {
    clinicalTrialsModel.forEach((clinicalTrialModel) => {
      this.clinicalTrialsRepository.push(new ClinicalTrialModel(
        clinicalTrialModel.uuid,
        clinicalTrialModel.public_title,
        clinicalTrialModel.scientific_title,
        clinicalTrialModel.recruitment,
        clinicalTrialModel.study_type,
        clinicalTrialModel.last_revision_date
      ))
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
    const genders : Array<Gender> = []

    if (typeof clinicalTrialModel.recruitment.genders === 'string' && clinicalTrialModel.recruitment.genders.length) {
      const gendersModel : Array<Gender> = clinicalTrialModel.recruitment.genders.split(',') as Array<Gender>
      gendersModel.map((gender) => genders.push(gender))
    }

    return new ClinicalTrial(
      new Title(
        clinicalTrialModel.public_title.acronym,
        clinicalTrialModel.public_title.value
      ),
      new Title(
        clinicalTrialModel.scientific_title.acronym,
        clinicalTrialModel.scientific_title.value
      ),
      new Recruitment({
        genders: genders,
        status: clinicalTrialModel.recruitment.status,
      }),
      new StudyType(
        clinicalTrialModel.study_type.phase,
        clinicalTrialModel.study_type.study_type,
        clinicalTrialModel.study_type.study_design
      ),
      clinicalTrialModel.last_revision_date
    )
  }
}
