import { Identifier, Reference } from 'fhir/r4'

import {
  AssignerForSecondaryIdentifier,
  ReferenceModel,
} from '../SpecialPurposeDataType/ReferenceModel'

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

  static createPrimarySlice(number: string): IdentifierModel {
    return new IdentifierModel(
      ReferenceModel.createAssignerForPrimaryIdentifier(),
      'official',
      number
    )
  }

  static createSecondarySlice(
    ctisOrNationalNumber: string,
    assigner: AssignerForSecondaryIdentifier
  ): IdentifierModel {
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
