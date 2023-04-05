import { Injectable, NotFoundException } from '@nestjs/common'

import { ClinicalTrial } from './model/ClinicalTrial'

@Injectable()
export class ClinicalTrialService {
  private readonly clinicalTrials: ClinicalTrial[] = []

  constructor(data: ClinicalTrial[]) {
    data.forEach((trial) => {
      this.clinicalTrials.push(new ClinicalTrial(trial))
    })
  }

  findOne(uuid: string): ClinicalTrial {
    const clinicalTrial = this.clinicalTrials.find((clinicalTrial) => clinicalTrial.uuid === uuid)
    if (!clinicalTrial) {
      throw new NotFoundException()
    }

    return clinicalTrial
  }
}
