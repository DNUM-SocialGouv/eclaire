import { Identifier, Reference } from 'fhir/r4'

import {
  AssignerForSecondaryIdentifier,
  ReferenceModel,
} from '../special-purpose-data-types/ReferenceModel'

export class IdentifierModel implements Identifier {
  constructor(
    readonly assigner: Reference | undefined,
    readonly use:
      | 'usual'
      | 'official'
      | 'temp'
      | 'secondary'
      | 'old'
      | undefined,
    readonly value: string | undefined
  ) {}

  static createPrimarySlice(number: string): Identifier {
    return new IdentifierModel(
      ReferenceModel.createAssignerForPrimaryIdentifier(),
      'official',
      number
    )
  }

  static createSecondarySlice(
    ctisOrNationalNumber: string,
    assigner: AssignerForSecondaryIdentifier
  ): Identifier {
    return new IdentifierModel(
      ReferenceModel.createAssignerForSecondaryIdentifier(assigner),
      'secondary',
      ctisOrNationalNumber
    )
  }

  static createLocation(id: string): IdentifierModel {
    return new IdentifierModel(
      undefined,
      'official',
      id
    )
  }
}
