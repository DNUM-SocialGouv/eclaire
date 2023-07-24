import { Coding } from 'fhir/r4'

import { administrativeGenderCodeSystem } from '../CodeSystem/administrativeGenderCodeSystem'
import { medDraCodeSystem } from '../CodeSystem/medDraCodeSystem'
import { researchStudyPhaseCodeSystem } from '../CodeSystem/researchStudyPhaseCodeSystem'

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
    const isolatedPhase = rawPhase?.split(/(Phase( *)\w{1,3})/)[1]

    const correspondingPhaseCode: PhaseCode = this.getPhaseCodeFromText(isolatedPhase)

    const matchingPhase = researchStudyPhaseCodeSystem.concept.find(
      (phase) => phase.code === correspondingPhaseCode
    )

    return new CodingModel(
      matchingPhase?.code,
      matchingPhase?.display,
      undefined,
      researchStudyPhaseCodeSystem.url,
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

  static createDiseaseCoding(disease: string): CodingModel {
    return new CodingModel(
      undefined,
      disease,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createMedDraCode(medDraCode: string): CodingModel {
    return new CodingModel(
      medDraCode,
      medDraCodeSystem.title,
      undefined,
      medDraCodeSystem.url,
      undefined,
      medDraCodeSystem.version
    )
  }

  static createGender(gender: string): CodingModel {
    const matchingGender = administrativeGenderCodeSystem.concept.find(
      (genderReference) => genderReference.code === gender.toLowerCase()
    )

    return new CodingModel(
      matchingGender?.code,
      matchingGender?.display,
      undefined,
      administrativeGenderCodeSystem.url,
      undefined,
      administrativeGenderCodeSystem.version
    )
  }

  static createAgeRange(parsedAgeRange: string): CodingModel {
    return new CodingModel(
      undefined,
      parsedAgeRange,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createStudySize(studySize: number): CodingModel {
    return new CodingModel(
      undefined,
      studySize.toString(),
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): CodingModel {
    return new CodingModel(
      undefined,
      researchStudyGroupCategory,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createStudyPopulation(studyPopulation: string): CodingModel {
    return new CodingModel(
      undefined,
      studyPopulation,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createGroupCharacteristicCode(code: string): CodingModel {
    return new CodingModel(
      undefined,
      code,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createRegulationCode(regulationCode: string): CodingModel {
    return new CodingModel(
      undefined,
      regulationCode,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createInclusion(inclusion: string): CodingModel {
    return new CodingModel(
      undefined,
      inclusion,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createExclusion(exclusion: string): CodingModel {
    return new CodingModel(
      undefined,
      exclusion,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createOrganizationContactPurpose(): CodingModel {
    return new CodingModel(
      'ADMIN',
      'Administrative',
      undefined,
      'http://terminology.hl7.org/CodeSystem/contactentity-type',
      undefined,
      '4.0.1'
    )
  }

  static createOrganizationSponsorType(): CodingModel {
    return new CodingModel(
      'crs',
      'Clinical Research Sponsor',
      undefined,
      'http://terminology.hl7.org/CodeSystem/organization-type',
      undefined,
      '4.0.1'
    )
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
