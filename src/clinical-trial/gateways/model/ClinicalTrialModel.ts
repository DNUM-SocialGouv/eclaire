import { StudyTypeModel } from './StudyTypeModel'
import { TitleModel } from './TitleModel'
import { RecruitmentStatus } from '../../application/RecruitmentStatus'

export class ClinicalTrialModel {
  constructor(clinicalTrialModel?: Partial<ClinicalTrialModel>) {
    if (clinicalTrialModel) {
      Object.assign(this, clinicalTrialModel)
    }
  }

  readonly uuid: string
  readonly public_title: TitleModel = new TitleModel()
  readonly scientific_title: TitleModel = new TitleModel()
  readonly recruitment_status: string = RecruitmentStatus.UNAVAILABLE
  readonly study_type: StudyTypeModel = new StudyTypeModel()
  readonly last_revision_date: string = new Date().toString()
}
