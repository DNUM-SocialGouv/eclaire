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

  static createPrimarySlice(nationalNumberOrEquivalent: string): IdentifierModel {
    return new IdentifierModel(
      ReferenceModel.createAssignerForPrimaryIdentifier(),
      undefined,
      undefined,
      undefined,
      'official',
      undefined,
      nationalNumberOrEquivalent
    )
  }

  static createSecondarySlice(
    nationalNumberOrEquivalent: string,
    assigner: AssignerForSecondaryIdentifier
  ): IdentifierModel {
    return new IdentifierModel(
      ReferenceModel.createAssignerForSecondaryIdentifier(assigner),
      undefined,
      undefined,
      undefined,
      'secondary',
      undefined,
      nationalNumberOrEquivalent
    )
  }
}
