import { Identifier, Period, Reference } from 'fhir/r4'

import { PeriodModel } from './PeriodModel'
import {
  AssignerForPrimaryIdentifier,
  ReferenceModel,
} from '../special-purpose-data-types/ReferenceModel'

export class IdentifierModel implements Identifier {
  private constructor(
    readonly assigner: Reference | undefined,
    readonly period: Period | undefined,
    readonly use:
      | 'usual'
      | 'official'
      | 'temp'
      | 'secondary'
      | 'old'
      | undefined,
    readonly value: string | undefined
  ) {}

  static createPrimarySlice(
    ctisOrNationalNumber: string,
    assigner: AssignerForPrimaryIdentifier,
    registrationDateInPrimaryRegistry: string
  ): Identifier {
    const period = (registrationDateInPrimaryRegistry !== undefined)
      ? PeriodModel.createRegistrationInPrimaryRegistry(registrationDateInPrimaryRegistry)
      : undefined

    return new IdentifierModel(
      ReferenceModel.createAssignerForPrimaryIdentifier(assigner),
      period,
      'official',
      ctisOrNationalNumber
    )
  }

  static createSecondarySlice(number: string, registrationDateInPrimaryRegistry: string): Identifier {
    return new IdentifierModel(
      ReferenceModel.createAssignerForSecondaryIdentifier(),
      PeriodModel.createRegistrationInPrimaryRegistry(registrationDateInPrimaryRegistry),
      'secondary',
      number
    )
  }

  static createLocation(id: string): IdentifierModel {
    return new IdentifierModel(
      undefined,
      undefined,
      'official',
      id
    )
  }
}
