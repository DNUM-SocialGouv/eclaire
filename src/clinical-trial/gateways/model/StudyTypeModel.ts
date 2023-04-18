export class StudyTypeModel {
  constructor(
    readonly phase: string,
    readonly study_type: string,
    readonly study_design: string,
    readonly ages_range: string[],
    readonly age_range_secondary_identifiers: string[]
  ) {}
}
