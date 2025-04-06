import { Period } from 'fhir/r4'

export class PeriodModel implements Period {
  private constructor(
    readonly end: string | undefined,
    readonly start: string | undefined
  ) {}

  static createRecruitmentPeriod(start: string, end: string): Period {
    return new PeriodModel(
      end,
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

  static createEclaireAssociatedPartyR5Period(period: string) {
    return new PeriodModel(
      undefined,
      period
    )
  }
}
