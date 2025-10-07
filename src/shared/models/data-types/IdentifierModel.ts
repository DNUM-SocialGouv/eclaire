import { Identifier, Reference } from 'fhir/r4'

//import { PeriodModel } from './PeriodModel'
import {
  AssignerForPrimaryIdentifier,
  ReferenceModel,
} from '../special-purpose-data-types/ReferenceModel'

export class IdentifierModel implements Identifier {
  private constructor(
    readonly assigner: Reference | undefined,
    readonly use:
      | 'usual'
      | 'official'
      | 'temp'
      | 'secondary'
      | 'old'
      | undefined,
    readonly value: string | undefined,
    readonly system?: string
  ) { }

  static removeUndefined<T>(obj: T): T {
    return Object.fromEntries(
      Object.entries(obj).filter(([, value]) => value !== undefined && value !== null)
    ) as T
  }

  static createPrimarySlice(
    ctisOrNationalNumber: string,
    assigner: AssignerForPrimaryIdentifier
  ): Identifier {
    /* const period = (registrationDateInPrimaryRegistry !== undefined)
      ? PeriodModel.createRegistrationInPrimaryRegistry(registrationDateInPrimaryRegistry)
      : undefined */

    return this.removeUndefined(new IdentifierModel(
      ReferenceModel.createAssignerForPrimaryIdentifier(assigner),
      'official',
      ctisOrNationalNumber
    ))
  }

  static createSecondarySlice(number: string, assigner: AssignerForPrimaryIdentifier, use:
    | 'usual'
    | 'official'
    | 'temp'
    | 'secondary'
    | 'old', uri?: string | null): Identifier {
    return this.removeUndefined(new IdentifierModel(
      ReferenceModel.createAssignerForSecondaryIdentifier(assigner),
      use,
      number,
      uri
    ))
  }

  static createLocation(id: string): IdentifierModel {
    return this.removeUndefined(new IdentifierModel(
      undefined,
      'official',
      id
    ))
  }
}
