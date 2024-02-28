import { Identifier, Period, Reference } from 'fhir/r4'

import { PeriodModel } from './PeriodModel'
import {
  AssignerForSecondaryIdentifier,
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

  static createPrimarySlice(number: string, registrationDateInPrimaryRegistry: string): Identifier {
    return new IdentifierModel(
      ReferenceModel.createAssignerForPrimaryIdentifier(),
      PeriodModel.createRegistrationInPrimaryRegistry(registrationDateInPrimaryRegistry),
      'official',
      number
    )
  }

  static createSecondarySlice(
    ctisOrNationalNumber: string,
    assigner: AssignerForSecondaryIdentifier,
    registrationDateInPrimaryRegistry: string
  ): Identifier {
    return new IdentifierModel(
      ReferenceModel.createAssignerForSecondaryIdentifier(assigner),
      PeriodModel.createRegistrationInPrimaryRegistry(registrationDateInPrimaryRegistry),
      'secondary',
      ctisOrNationalNumber
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
