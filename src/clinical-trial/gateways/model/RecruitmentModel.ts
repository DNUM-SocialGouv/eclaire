import { CriteriaModel } from './CriteriaModel'

export class RecruitmentModel {
  constructor(
    readonly status: string,
    readonly date_recruiting_status: string,
    readonly genders: string[],
    readonly ages_range: string[],
    readonly ages_range_secondary_identifiers: string[],
    readonly target_number: number,
    readonly exclusion_criteria: CriteriaModel,
    readonly inclusion_criteria: CriteriaModel,
    readonly clinical_trial_group: string,
    readonly vulnerable_population: string
  ) {}
}
