import { StudyTypeModel } from './StudyTypeModel'
import { TitleModel } from './TitleModel'

export class ClinicalTrialModel {
  constructor(
    readonly uuid: string,
    readonly public_title: TitleModel,
    readonly scientific_title: TitleModel,
    readonly recruitment_status: string,
    readonly study_type: StudyTypeModel,
    readonly last_revision_date: string
  ) {}
}
