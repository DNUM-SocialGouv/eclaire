import { Injectable, NotFoundException } from '@nestjs/common'

import { ClinicalTrialFactory } from './clinical-trial-factory'
import { ClinicalTrial } from '../../application/entities/ClinicalTrial'
import { ClinicalTrialRepository } from '../../application/interfaces/ClinicalTrialRepository'
import { ClinicalTrialModel } from '../model/ClinicalTrialModel'

@Injectable()
export class ClinicalTrialFileRepository implements ClinicalTrialRepository {
  private readonly clinicalTrialsRepository: ClinicalTrialModel[] = []

  constructor(clinicalTrialsModel: ClinicalTrialModel[]) {
    clinicalTrialsModel.forEach((clinicalTrialFile) => {
      this.clinicalTrialsRepository.push(new ClinicalTrialModel(
        clinicalTrialFile.uuid,
        clinicalTrialFile.universal_trial_number,
        clinicalTrialFile.secondaries_trial_numbers,
        clinicalTrialFile.public_title,
        clinicalTrialFile.scientific_title,
        clinicalTrialFile.recruitment,
        clinicalTrialFile.study_type,
        clinicalTrialFile.last_revision_date,
        clinicalTrialFile.contact,
        clinicalTrialFile.medical_condition,
        clinicalTrialFile.medical_condition_meddra,
        clinicalTrialFile.therapeutic_areas,
        clinicalTrialFile.primary_sponsor
      ))
    })
  }

  findOne(uuid: string): ClinicalTrial {
    const clinicalTrialModel = this.clinicalTrialsRepository.find((clinicalTrial) => clinicalTrial.uuid === uuid)
    if (!clinicalTrialModel) {
      throw new NotFoundException()
    }

    return ClinicalTrialFactory.buildClinicalTrial(clinicalTrialModel)
  }
}
