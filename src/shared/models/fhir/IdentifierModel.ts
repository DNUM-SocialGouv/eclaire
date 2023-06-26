import {
  CodeableConcept,
  Identifier,
  Period,
  Reference,
} from 'fhir/r4'

export class IdentifierModel implements Identifier {
  constructor(
    readonly assigner: Reference | undefined,
    readonly id: string | undefined,
    readonly period: Period | undefined,
    readonly system: string | undefined,
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
}
