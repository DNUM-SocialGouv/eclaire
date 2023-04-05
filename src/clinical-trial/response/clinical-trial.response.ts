import { ApiResponseInterface } from '../../app/interface/api-response.interface'
import { ClinicalTrial } from '../model/ClinicalTrial'

export class ClinicalTrialResponse implements ApiResponseInterface {
  constructor(readonly clinicalTrial: ClinicalTrial) {}

  getResponse(): object {
    return {
      public_title: this.clinicalTrial.public_title,
      scientific_title: this.clinicalTrial.scientific_title,
    }
  }
}
