import { Coding } from 'fhir/r4'

import { researchStudyPhaseCodeSystem } from './CodeSystem/researchStudyPhaseCodeSystem'

export class CodingModel implements Coding {
  constructor(
    readonly code: string | undefined,
    readonly display: string | undefined,
    readonly id: string | undefined,
    readonly system: string | undefined,
    readonly userSelected: boolean | undefined,
    readonly version: string | undefined
  ) {}

  static createResearchStudyPhase(rawPhase: string): CodingModel {
    const researchStudyPhases = researchStudyPhaseCodeSystem.concept

    const isolatedPhase = rawPhase?.split(new RegExp('(Phase( *)\\w{1,3})'))[1]

    const correspondingPhaseCode: PhaseCode = this.getPhaseCodeFromText(isolatedPhase)

    const matchingPhase = researchStudyPhases.find((phase) => {
      return phase.code === correspondingPhaseCode
    })

    const system = 'https://terminology.hl7.org/CodeSystem/research-study-phase'

    return new CodingModel(
      matchingPhase?.code,
      matchingPhase?.display,
      undefined,
      system,
      undefined,
      researchStudyPhaseCodeSystem.version
    )
  }

  private static getPhaseCodeFromText(isolatedPhase: string): PhaseCode {
    let correspondingPhaseCode: PhaseCode

    switch (isolatedPhase) {
      case 'Phase I':
        correspondingPhaseCode = PhaseCode.PHASE_1
        break
      case 'Phase II':
        correspondingPhaseCode = PhaseCode.PHASE_2
        break
      case 'Phase III':
        correspondingPhaseCode = PhaseCode.PHASE_3
        break
      case 'Phase IV':
        correspondingPhaseCode = PhaseCode.PHASE_4
        break
      default:
        correspondingPhaseCode = PhaseCode.NA
        break
    }
    return correspondingPhaseCode
  }
}

enum PhaseCode {
  NA = 'n-a',
  EARLY_PHASE_1 = 'early-phase-1',
  PHASE_1 = 'phase-1',
  PHASE_1_2 = 'phase-1-phase-2',
  PHASE_2 = 'phase-2',
  PHASE_2_3 = 'phase-2-phase-3',
  PHASE_3 = 'phase-3',
  PHASE_4 = 'phase-4',
}
