import { Period } from 'fhir/r4'

export class PeriodModel implements Period {
  constructor(
    readonly end: string | undefined,
    readonly start: string | undefined
  ) {}

  static createRecruitmentPeriod(start: string): Period {
    return new PeriodModel(
      undefined,
      new Date(start).toISOString()
    )
  }
}
