import { CodeableConcept, Identifier, Period, Reference } from 'fhir/r4'

import {
  AssignerForSecondaryIdentifier,
  ReferenceModel,
} from '../SpecialPurposeDataType/ReferenceModel'

export class IdentifierModel implements Identifier {
  constructor(
    readonly assigner: Reference | undefined,
    readonly id: string | undefined,
    readonly period: Period | undefined,
    readonly type: CodeableConcept | undefined,
    readonly use:
      | 'usual'
      | 'official'
      | 'temp'
      | 'secondary'
      | 'old'
      | undefined,
    readonly system: string | undefined,
    readonly value: string | undefined
  ) {}

  static createPrimarySlice(number: string): IdentifierModel {
    return new IdentifierModel(
      ReferenceModel.createAssignerForPrimaryIdentifier(),
      undefined,
      undefined,
      undefined,
      'official',
      undefined,
      number
    )
  }

  static createSecondarySlice(
    ctisOrNationalNumber: string,
    assigner: AssignerForSecondaryIdentifier
  ): IdentifierModel {
    return new IdentifierModel(
      ReferenceModel.createAssignerForSecondaryIdentifier(assigner),
      undefined,
      undefined,
      undefined,
      'secondary',
      undefined,
      ctisOrNationalNumber
    )
  }

  static createLocation(id: string): IdentifierModel {
    return new IdentifierModel(
      undefined,
      undefined,
      undefined,
      undefined,
      'official',
      undefined,
      id
    )
  }
}
