import { ClinicalTrialModel } from '../model/ClinicalTrialModel'
import { RecruitmentModel } from '../model/RecruitmentModel'
import { StudyTypeModel } from '../model/StudyTypeModel'
import { TitleModel } from '../model/TitleModel'

export class ClinicalTrialModelTestingFactory {
  private static clinicalTrialModel = new ClinicalTrialModel(
    '123',
    new TitleModel('', ''),
    new TitleModel('', ''),
    new RecruitmentModel(
      'UNAVAILABLE',
      ['MALE'],
      [],
      [],
      400
    ),
    new StudyTypeModel('', '', ''),
    '',
    '',
    {}
  )

  static create(overridedFields?: Partial<ClinicalTrialModel>): ClinicalTrialModel {
    return {
      ...this.clinicalTrialModel,
      ...overridedFields,
    }
  }
}
