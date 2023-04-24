import { ContactDetailsModel } from './ContactDetailsModel'
import { ContactModel } from './ContactModel'
import { RecruitmentModel } from './RecruitmentModel'
import { StudyTypeModel } from './StudyTypeModel'
import { TherapeuticAreaModel } from './TherapeuticAreaModel'
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
    readonly contact: ContactModel,
    readonly medical_condition: string,
    readonly medical_condition_meddra: Array<string>,
    readonly therapeutic_areas: Array<TherapeuticAreaModel>,
    readonly primary_sponsor: ContactDetailsModel,
    readonly trial_sites: ContactDetailsModel[],
    readonly summary_clinicial_trial: string
  ) {}
}
