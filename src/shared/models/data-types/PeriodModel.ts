import { Period } from 'fhir/r4'

export class PeriodModel implements Period {
  private constructor(
    readonly end: string | undefined,
    readonly start: string | undefined
  ) {}

  static createRecruitmentPeriod(start: string): Period {
    return new PeriodModel(
      undefined,
      start
    )
  }

  static createCompletionDate(completionDate: string): Period {
    return new PeriodModel(
      completionDate,
      undefined
    )
  }

  static createRegistrationInPrimaryRegistry(registrationDateInPrimaryRegistry: string): Period {
    return new PeriodModel(
      undefined,
      registrationDateInPrimaryRegistry
    )
  }
}
