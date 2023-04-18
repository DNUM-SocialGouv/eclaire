export class RecruitmentModel {
  constructor(
    readonly status: string,
    readonly genders: string[],
    readonly ages_range: string[],
    readonly ages_range_secondary_identifiers: string[]
  ) {}
}
