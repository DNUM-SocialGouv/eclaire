import {
  CodeableConcept,
  Identifier,
  Period,
  Reference,
} from 'fhir/r4'

import { ReferenceModel } from './ReferenceModel'

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
    readonly value: string | undefined
  ) {}

  static createCtisIdentifier(numero_ctis: string): IdentifierModel {
    return new IdentifierModel(
      ReferenceModel.createCtisReferenceModel(numero_ctis),
      undefined,
      undefined,
      undefined,
      'usual',
      numero_ctis
    )
  }
}
