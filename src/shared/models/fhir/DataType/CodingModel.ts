import { Coding } from 'fhir/r4'

import { administrativeGenderCodeSystem } from '../CodeSystem/administrativeGenderCodeSystem'
import { countryCodeSystem } from '../CodeSystem/countryCodeSystem'
import { eclaireTypeContactCodeSystem } from '../CodeSystem/eclaireTypeContactCodeSystem'
import { medDraCodeSystem } from '../CodeSystem/medDraCodeSystem'
import { researchStudyPhaseCodeSystem } from '../CodeSystem/researchStudyPhaseCodeSystem'
import { titleTypeCodeSystem } from '../CodeSystem/titleTypeCodeSystem'
import { ContactType } from '../MetadataType/ContactDetailModel'
import { LabelType } from '../SpecialPurposeDataType/ExtensionModel'

export class CodingModel implements Coding {
  constructor(
    readonly code: string | undefined,
    readonly display: string | undefined,
    readonly system: string | undefined,
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
      researchStudyPhaseCodeSystem.url,
      researchStudyPhaseCodeSystem.version
    )
  }

  private static getPhaseCodeFromText(isolatedPhase: string): PhaseCode {
    switch (isolatedPhase) {
      case 'Phase I':
        return PhaseCode.PHASE_1
      case 'Phase II':
        return PhaseCode.PHASE_2
      case 'Phase III':
        return PhaseCode.PHASE_3
      case 'Phase IV':
        return PhaseCode.PHASE_4
      default:
        return PhaseCode.NA
    }
  }

  static createDiseaseCoding(disease: string): CodingModel {
    return new CodingModel(
      undefined,
      disease,
      undefined,
      undefined
    )
  }

  static createMedDraCode(medDraCode: string): CodingModel {
    return new CodingModel(
      medDraCode,
      medDraCodeSystem.title,
      medDraCodeSystem.url,
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
      administrativeGenderCodeSystem.url,
      administrativeGenderCodeSystem.version
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): CodingModel {
    return new CodingModel(
      undefined,
      researchStudyGroupCategory,
      undefined,
      undefined
    )
  }

  static createStudyPopulation(studyPopulation: string): CodingModel {
    return new CodingModel(
      undefined,
      studyPopulation,
      undefined,
      undefined
    )
  }

  static createGroupCharacteristicCode(code: string): CodingModel {
    return new CodingModel(
      undefined,
      code,
      undefined,
      undefined
    )
  }

  static createRegulationCode(regulationCode: string): CodingModel {
    return new CodingModel(
      undefined,
      regulationCode,
      undefined,
      undefined
    )
  }

  static createInclusion(inclusion: string): CodingModel {
    return new CodingModel(
      undefined,
      inclusion,
      undefined,
      undefined
    )
  }

  static createExclusion(exclusion: string): CodingModel {
    return new CodingModel(
      undefined,
      exclusion,
      undefined,
      undefined
    )
  }

  static createOrganizationContactPurpose(): CodingModel {
    return new CodingModel(
      'ADMIN',
      'Administrative',
      'http://terminology.hl7.org/CodeSystem/contactentity-type',
      '4.0.1'
    )
  }

  static createOrganizationSponsorType(): CodingModel {
    return new CodingModel(
      'crs',
      'Clinical Research Sponsor',
      'http://terminology.hl7.org/CodeSystem/organization-type',
      '4.0.1'
    )
  }

  static createContactType(contactType: ContactType): CodingModel {
    const reference = eclaireTypeContactCodeSystem.concept.find(
      (reference) => reference.display.includes(contactType)
    )

    return new CodingModel(
      reference.code,
      reference.display,
      eclaireTypeContactCodeSystem.url,
      eclaireTypeContactCodeSystem.version
    )
  }

  static createLocation(countryCode: string): CodingModel {
    const country = countryCodeSystem.compose.include[0].concept.find(
      (country): boolean => country.code === countryCode
    )

    return new CodingModel(
      countryCode,
      country.display,
      countryCodeSystem.compose.include[0].system,
      countryCodeSystem.version
    )
  }

  static createLabelType(labelType: LabelType): CodingModel {
    const matchingLabelType = titleTypeCodeSystem.concept.find(
      (reference) => reference.code === labelType
    )

    return new CodingModel(
      matchingLabelType.code,
      matchingLabelType.display,
      titleTypeCodeSystem.url,
      titleTypeCodeSystem.version
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
