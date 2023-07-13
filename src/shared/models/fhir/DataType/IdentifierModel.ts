import {
  CodeableConcept,
  Identifier,
  Period,
  Reference,
} from 'fhir/r4'

import { ReferenceModel } from '../SpecialPurposeDataType/ReferenceModel'

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

  static createCtisIdentifier(ctisNumber: string): IdentifierModel {
    return new IdentifierModel(
      ReferenceModel.createCtisReferenceModel(ctisNumber),
      undefined,
      undefined,
      undefined,
      'usual',
      undefined,
      ctisNumber
    )
  }
}
