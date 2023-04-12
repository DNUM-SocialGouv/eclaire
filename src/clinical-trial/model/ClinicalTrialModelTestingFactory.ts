import { ClinicalTrialModel } from './ClinicalTrialModel'
import { TitleModel } from './TitleModel'

export class ClinicalTrialModelTestingFactory {
  private static clincialTrialModel = new ClinicalTrialModel({
    public_title: new TitleModel({
      acronym: 'RSC',
      value: 'Resist, scotty, core!',
    }),
    recruitment_status: 'RECRUITING',
    scientific_title: new TitleModel({
      acronym: 'RSC',
      value: 'Try draining rhubarb fritters flavored with bourbon.',
    }),
    uuid: '123',
  })

  static create(overridedFields?: Partial<ClinicalTrialModel>): ClinicalTrialModel {
    return {
      ...ClinicalTrialModelTestingFactory.clincialTrialModel,
      ...overridedFields,
    }
  }
}
