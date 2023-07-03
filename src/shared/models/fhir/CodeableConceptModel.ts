import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel } from './CodingModel'

export class CodeableConceptModel implements CodeableConcept {
  constructor(
    readonly coding: Coding[] | undefined,
    readonly id: string | undefined,
    readonly text: string | undefined
  ) {}

  static createResearchStudyPhase(phase_recherche: string) {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyPhase(phase_recherche)],
      undefined,
      phase_recherche
    )
  }

  static createCategory(reglementationCode: string): CodeableConceptModel {

    return new CodeableConceptModel(
      [undefined],
      undefined,
      reglementationCode
    )
  }
}
