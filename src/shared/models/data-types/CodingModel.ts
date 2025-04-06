import { Coding } from 'fhir/r4'

import { administrativeGenderCodeSystem } from '../code-systems/administrativeGenderCodeSystem'
import { countryCodeSystem } from '../code-systems/countryCodeSystem'
import { eclaireGroupCharacteristicKindVs } from '../code-systems/eclaireGroupCharacteristicKindVs'
import { eclaireReglementationPrecisionCodeSystem } from '../code-systems/eclaireReglementationPrecisionCodeSystem'
import { eclaireRegulationCodeCodeSystem } from '../code-systems/eclaireRegulationCodeCodeSystem'
import { eclaireStatusRecruitmentCodeSystem } from '../code-systems/eclaireStatusRecruitmentCodeSystem'
import { eclaireStudyPartyOrganizationTypeCodeSystem } from '../code-systems/eclaireStudyPartyOrganizationTypeCodeSystem'
import { eclaireStudyPartyRoleVsCodeSystem } from '../code-systems/eclaireStudyPartyRoleVsCodeSystem'
import { eclaireStudyPhaseCodeSystem } from '../code-systems/eclaireStudyPhaseCodeSystem'
import { eclaireStudyPopulationCodeSystem } from '../code-systems/eclaireStudyPopulationCodeSystem'
import { eclaireStudyTitleTypeCodeSystem } from '../code-systems/eclaireStudyTitleTypeCodeSystem'
import { eclaireTypeContactCodeSystem } from '../code-systems/eclaireTypeContactCodeSystem'
import { medDraCodeSystem } from '../code-systems/medDraCodeSystem'
import { researchStudyPhaseCodeSystem } from '../code-systems/researchStudyPhaseCodeSystem'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { LabelType } from '../special-purpose-data-types/ExtensionModel'

export class CodingModel implements Coding {
  private constructor(
    readonly code: string | undefined,
    readonly display: string | undefined,
    readonly system: string | undefined,
    readonly version: string | undefined
  ) {}

  static createResearchStudyPhase(phase: string): Coding {
    const { code, display, url, version } = this.findPhaseInCodeSystems(phase)

    return new CodingModel(
      code,
      display,
      url,
      version
    )
  }

  private static findPhaseInCodeSystems(phase: string): { code: string; display: string; version: string; url: string } {
    let index: number
    const codeSystemToUse = phase === 'Phase III/Phase IV' ? eclaireStudyPhaseCodeSystem : researchStudyPhaseCodeSystem

    switch (phase) {
      case 'Phase I':
        index = 2
        break
      case 'Phase I/Phase II':
        index = 3
        break
      case 'Phase II':
        index = 4
        break
      case 'Phase II/Phase III':
        index = 5
        break
      case 'Phase III':
        index = 6
        break
      case 'Phase IV':
        index = 7
        break
      case 'Phase III/Phase IV':
        index = 0
        break
      default:
        index = 0
    }

    return {
      code: codeSystemToUse.concept[index].code,
      display: codeSystemToUse.concept[index].display,
      url: codeSystemToUse.url,
      version: codeSystemToUse.version,
    }
  }

  static createMedDra(code: string, label: string): Coding {
    return new CodingModel(
      code,
      label,
      medDraCodeSystem.url,
      medDraCodeSystem.version
    )
  }

  static createGender(gender: string): Coding {
    const matchingGender = administrativeGenderCodeSystem.concept.find(
      (genderReference): boolean => genderReference.code === gender.toLowerCase()
    )

    return new CodingModel(
      matchingGender.code,
      matchingGender.display,
      administrativeGenderCodeSystem.url,
      administrativeGenderCodeSystem.version
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): Coding {
    return new CodingModel(
      undefined,
      researchStudyGroupCategory,
      undefined,
      undefined
    )
  }

  static createStudyPopulation(studyPopulation: string): Coding {
    const matchingStudyPopulation = eclaireStudyPopulationCodeSystem.concept.find(
      (studyPopulationCode): boolean => studyPopulationCode.display.includes(studyPopulation)
    )

    return new CodingModel(
      matchingStudyPopulation?.code,
      matchingStudyPopulation?.display,
      eclaireStudyPopulationCodeSystem.url,
      eclaireStudyPopulationCodeSystem.version
    )
  }

  static createRegulationCode(regulationCode: string): Coding {
    const matchingRegulationCode = eclaireRegulationCodeCodeSystem.concept.find(
      (regulationCodeCode): boolean => regulationCodeCode.code === regulationCode
    )

    return new CodingModel(
      matchingRegulationCode.code,
      matchingRegulationCode.display,
      eclaireRegulationCodeCodeSystem.url,
      eclaireRegulationCodeCodeSystem.version
    )
  }

  static createReglementationPrecision(reglementationPrecisionRaw: string): Coding {
    const matchingReglementationPrecision = eclaireReglementationPrecisionCodeSystem.concept.find(
      (reglementationPrecisionCode): boolean => reglementationPrecisionCode.display.includes(reglementationPrecisionRaw)
    )

    return new CodingModel(
      matchingReglementationPrecision.code,
      matchingReglementationPrecision.display,
      eclaireReglementationPrecisionCodeSystem.url,
      eclaireReglementationPrecisionCodeSystem.version
    )
  }

  static createInclusion(inclusion: string): Coding {
    return new CodingModel(
      undefined,
      inclusion,
      undefined,
      undefined
    )
  }

  static createExclusion(exclusion: string): Coding {
    return new CodingModel(
      undefined,
      exclusion,
      undefined,
      undefined
    )
  }

  static createOrganizationContactPurpose(): Coding {
    return new CodingModel(
      'ADMIN',
      'Administrative',
      'http://terminology.hl7.org/CodeSystem/contactentity-type',
      '4.0.1'
    )
  }

  static createOrganizationSponsorType(): Coding {
    return new CodingModel(
      'crs',
      'Clinical Research Sponsor',
      'http://terminology.hl7.org/CodeSystem/organization-type',
      '4.0.1'
    )
  }

  static createContactType(contactType: ContactType): Coding {
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

  static createLocation(countryCode: string): Coding {
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

  static createLabelType(labelType: LabelType): Coding {
    const matchingLabelType = eclaireStudyTitleTypeCodeSystem.concept.find(
      (reference) => reference.code === labelType
    )

    return new CodingModel(
      matchingLabelType.code,
      matchingLabelType.display,
      eclaireStudyTitleTypeCodeSystem.url,
      eclaireStudyTitleTypeCodeSystem.version
    )
  }

  static createGroupCharacteristicKindVs(referenceCode: EclaireGroupCharacteristicKindVsReferenceCode): CodingModel {
    const groupCharacteristicKind = eclaireGroupCharacteristicKindVs.concept.find(
      (reference) => reference.code === referenceCode
    )

    return new CodingModel(
      groupCharacteristicKind.code,
      groupCharacteristicKind.display,
      eclaireGroupCharacteristicKindVs.url,
      eclaireGroupCharacteristicKindVs.version
    )
  }

  static createRecruitmentStatus(status: string): CodingModel {
    const recruitmentStatus = eclaireStatusRecruitmentCodeSystem.concept.find(
      (reference) => reference.code === status
    )

    return new CodingModel(
      recruitmentStatus?.code,
      recruitmentStatus?.display,
      eclaireGroupCharacteristicKindVs.url,
      eclaireGroupCharacteristicKindVs.version
    )
  }

  static createEclaireAssociatedPartyR5Role(role: string) {
    const partyRole = eclaireStudyPartyRoleVsCodeSystem.concept.find(
      (reference) => reference.code === role
    )

    return new CodingModel(
      partyRole?.code,
      partyRole?.display,
      eclaireStudyPartyRoleVsCodeSystem.url,
      eclaireStudyPartyRoleVsCodeSystem.version
    )
  }

  static createEclaireAssociatedPartyR5Classifier(classifier: string) {
    const studyPartyOrganizationType = eclaireStudyPartyOrganizationTypeCodeSystem.concept.find(
      (reference) => reference.code === classifier
    )

    return new CodingModel(
      studyPartyOrganizationType?.code,
      studyPartyOrganizationType?.display,
      eclaireStudyPartyOrganizationTypeCodeSystem.url,
      eclaireStudyPartyOrganizationTypeCodeSystem.version
    )
  }

  static createEclairePrimaryPurposeType() {
    return new CodingModel(
      'primary',
      'Primary',
      'http://terminology.hl7.org/CodeSystem/research-study-objective-type',
      '0.1.0'
    )
  }
}

export type EclaireGroupCharacteristicKindVsReferenceCode = 'grp-gender' | 'grp-studypop' | 'grp-category' | 'grp-age' | 'grp-other'
