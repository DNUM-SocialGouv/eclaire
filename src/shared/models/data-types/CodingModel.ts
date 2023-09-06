import { Coding } from 'fhir/r4'

import { administrativeGenderCodeSystem } from '../code-systems/administrativeGenderCodeSystem'
import { countryCodeSystem } from '../code-systems/countryCodeSystem'
import { eclaireTypeContactCodeSystem } from '../code-systems/eclaireTypeContactCodeSystem'
import { medDraCodeSystem } from '../code-systems/medDraCodeSystem'
import { researchStudyPhaseCodeSystem } from '../code-systems/researchStudyPhaseCodeSystem'
import { titleTypeCodeSystem } from '../code-systems/titleTypeCodeSystem'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { LabelType } from '../special-purpose-data-types/ExtensionModel'

export class CodingModel implements Coding {
  private constructor(
    readonly code: string | undefined,
    readonly display: string | undefined,
    readonly system: string | undefined,
    readonly version: string | undefined
  ) {}

  static createResearchStudyPhase(rawPhase: string): Coding {
    const isolatedPhase = rawPhase?.split(/(Phase( *)\w{1,3})/)[1]

    const { code, display } = this.getPhaseCodeFromText(isolatedPhase)

    return new CodingModel(
      code,
      display,
      researchStudyPhaseCodeSystem.url,
      researchStudyPhaseCodeSystem.version
    )
  }

  private static getPhaseCodeFromText(isolatedPhase: string): { code: string, display: string } {
    let index = 0

    switch (isolatedPhase) {
      case 'Phase I':
        index = 2
        break
      case 'Phase II':
        index = 4
        break
      case 'Phase III':
        index = 6
        break
      case 'Phase IV':
        index = 7
        break
      default:
    }

    return {
      code: researchStudyPhaseCodeSystem.concept[index].code,
      display: researchStudyPhaseCodeSystem.concept[index].display,
    }
  }

  static createDisease(disease: string): Coding {
    return new CodingModel(
      undefined,
      disease,
      undefined,
      undefined
    )
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
    return new CodingModel(
      undefined,
      studyPopulation,
      undefined,
      undefined
    )
  }

  static createRegulationCode(regulationCode: string): Coding {
    return new CodingModel(
      undefined,
      regulationCode,
      undefined,
      undefined
    )
  }

  static createReglementationPrecision(reglementationPrecisionRaw: string): Coding {
    let reglementationPrecision = reglementationPrecisionRaw

    if (reglementationPrecisionRaw === 'No') {
      reglementationPrecision = 'un essai clinique'
    } else if (reglementationPrecisionRaw === 'Yes') {
      reglementationPrecision = 'un essai clinique à faible intervention'
    }

    return new CodingModel(
      undefined,
      reglementationPrecision,
      undefined,
      undefined
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
