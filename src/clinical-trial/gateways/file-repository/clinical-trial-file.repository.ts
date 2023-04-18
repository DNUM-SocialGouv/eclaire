import { Injectable, NotFoundException } from '@nestjs/common'

import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { Recruitment } from '../../application/entities/Recruitment'
import { StudyType } from '../../application/entities/StudyType'
import { Title } from '../../application/entities/Title'
import { Gender } from '../../application/Gender'
import { ClinicalTrialRepository } from '../../application/interfaces/ClinicalTrialRepository'
import { PrimaryAge } from '../../application/PrimaryAge'
import { SecondaryAge } from '../../application/SecondaryAge'
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
        clinicalTrialModel.last_revision_date,
        clinicalTrialModel.universal_trial_number,
        clinicalTrialModel.secondaries_trial_numbers
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
    return new ClinicalTrial(
      new Title(
        clinicalTrialModel.public_title.acronym,
        clinicalTrialModel.public_title.value
      ),
      new Title(
        clinicalTrialModel.scientific_title.acronym,
        clinicalTrialModel.scientific_title.value
      ),
      new Recruitment(
        clinicalTrialModel.recruitment.status,
        clinicalTrialModel.recruitment.genders.map((gender: string): Gender => Gender[gender as keyof typeof Gender])
      ),
      new StudyType(
        clinicalTrialModel.study_type.phase,
        clinicalTrialModel.study_type.study_type,
        clinicalTrialModel.study_type.study_design,
        clinicalTrialModel.study_type.ages_range.map((age: string): PrimaryAge => PrimaryAge[age as keyof typeof PrimaryAge]),
        clinicalTrialModel.study_type.age_range_secondary_identifiers.map((age: string): SecondaryAge => SecondaryAge[age as keyof typeof SecondaryAge])
      ),
      clinicalTrialModel.last_revision_date,
      clinicalTrialModel.universal_trial_number,
      clinicalTrialModel.secondaries_trial_numbers
    )
  }
}
