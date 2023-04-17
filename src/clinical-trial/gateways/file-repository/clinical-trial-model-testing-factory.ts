import { ClinicalTrialModel } from '../model/ClinicalTrialModel'
import { StudyTypeModel } from '../model/StudyTypeModel'
import { TitleModel } from '../model/TitleModel'

export class ClinicalTrialModelTestingFactory {
  private static clincialTrialModel = new ClinicalTrialModel(
    '123',
    new TitleModel(
      'RSC',
      'Resist, scotty, core!'
    ),
    new TitleModel(
      'RSC',
      'Try draining rhubarb fritters flavored with bourbon.'
    ),
    'RECRUITING',
    new StudyTypeModel(
      'Phase II/Phase III',
      '',
      ''
    ),
    new Date().toString()
  )

  static create(overridedFields?: Partial<ClinicalTrialModel>): ClinicalTrialModel {
    return {
      ...this.clincialTrialModel,
      ...overridedFields,
    }
  }
}
