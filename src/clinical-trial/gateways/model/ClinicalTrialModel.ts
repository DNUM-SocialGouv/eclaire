import { ContactModel } from './ContactModel'
import { RecruitmentModel } from './RecruitmentModel'
import { StudyTypeModel } from './StudyTypeModel'
import { TitleModel } from './TitleModel'

export class ClinicalTrialModel {
  constructor(
    readonly uuid: string,
    readonly universal_trial_number: string,
    readonly secondaries_trial_numbers: Record<string, string>,
    readonly public_title: TitleModel,
    readonly scientific_title: TitleModel,
    readonly recruitment: RecruitmentModel,
    readonly study_type: StudyTypeModel,
    readonly last_revision_date: string,
    readonly contact: ContactModel
  ) {}
}
