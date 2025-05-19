import { Period } from 'fhir/r4'

import { ModelUtils } from '../eclaire/ModelUtils'

export class PeriodModel implements Period {
  private constructor(
    readonly end: string | undefined,
    readonly start: string | undefined
  ) {}

  static createRecruitmentPeriod(start: string, end: string): Period {
    return new PeriodModel(
      ModelUtils.undefinedIfNull(end),
      ModelUtils.undefinedIfNull(start)
    )
  }

  static createCompletionDate(completionDate: string): Period {
    return new PeriodModel(
      ModelUtils.undefinedIfNull(completionDate),
      undefined
    )
  }

  static createRegistrationInPrimaryRegistry(registrationDateInPrimaryRegistry: string): Period {
    if (registrationDateInPrimaryRegistry === ModelUtils.UNAVAILABLE) {
      return undefined
    }

    return new PeriodModel(
      undefined,
      ModelUtils.undefinedIfNull(registrationDateInPrimaryRegistry)
    )
  }

  static createEclaireAssociatedPartyR5Period(period: string) {
    return new PeriodModel(
      undefined,
      ModelUtils.undefinedIfNull(period)
    )
  }
}
