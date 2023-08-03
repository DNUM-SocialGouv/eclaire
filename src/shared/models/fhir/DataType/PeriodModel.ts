import { Period } from 'fhir/r4'

export class PeriodModel implements Period {
  constructor(
    readonly end: string | undefined,
    readonly id: string | undefined,
    readonly start: string | undefined
  ) {}

  static createRecruitmentPeriod(start: string): PeriodModel {
    return new PeriodModel(
      undefined,
      undefined,
      new Date(start).toISOString()
    )
  }
}
