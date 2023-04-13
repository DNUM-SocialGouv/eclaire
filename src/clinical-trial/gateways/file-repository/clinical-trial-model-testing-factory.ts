import { ClinicalTrialModel } from '../model/ClinicalTrialModel'
import { StudyTypeModel } from '../model/StudyTypeModel'
import { TitleModel } from '../model/TitleModel'

export class ClinicalTrialModelTestingFactory {
  private static clincialTrialModel = new ClinicalTrialModel({
    last_revision_date: new Date().toString(),
    public_title: new TitleModel({
      acronym: 'RSC',
      value: 'Resist, scotty, core!',
    }),
    recruitment_status: 'RECRUITING',
    scientific_title: new TitleModel({
      acronym: 'RSC',
      value: 'Try draining rhubarb fritters flavored with bourbon.',
    }),
    study_type: new StudyTypeModel(),
    uuid: '123',
  })

  static create(overridedFields?: Partial<ClinicalTrialModel>): ClinicalTrialModel {
    return {
      ...this.clincialTrialModel,
      ...overridedFields,
    }
  }
}
