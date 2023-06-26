import { CodeableConcept, Coding } from 'fhir/r4'

export class CodeableConceptModel implements CodeableConcept {
  constructor(
    readonly coding: Coding[] | undefined,
    readonly id: string | undefined,
    readonly text: string | undefined
  ) {}
}
