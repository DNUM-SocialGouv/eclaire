import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel } from './CodingModel'
import { ModelUtils } from '../../custom/ModelUtils'
import { ContactType } from '../MetadataType/ContactDetailModel'
import { LabelType } from '../SpecialPurposeDataType/ExtensionModel'

export class CodeableConceptModel implements CodeableConcept {
  constructor(
    readonly coding: Coding[] | undefined,
    readonly id: string | undefined,
    readonly text: string | undefined
  ) {}

  static createResearchStudyPhase(researchStudyPhase: string): CodeableConceptModel {
    const emptyResearchStudyPhaseIfNull = ModelUtils.emptyIfNull(researchStudyPhase)

    return new CodeableConceptModel(
      [CodingModel.createResearchStudyPhase(emptyResearchStudyPhaseIfNull)],
      undefined,
      emptyResearchStudyPhaseIfNull
    )
  }

  static createCategory(regulationCode: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createRegulationCode(regulationCode)],
      undefined,
      'Regulation Code'
    )
  }

  static createDiseaseCondition(disease: string): CodeableConceptModel {
    const emptyDiseaseIfNull = ModelUtils.emptyIfNull(disease)

    return new CodeableConceptModel(
      [CodingModel.createDiseaseCoding(emptyDiseaseIfNull)],
      undefined,
      'Disease Condition'
    )
  }

  static createMedDraCondition(medDraInformation: string): CodeableConceptModel {
    let parsedMedDraInformation: string[]

    const emptyMedDraInformationIfNull = ModelUtils.emptyIfNull(medDraInformation)

    if (emptyMedDraInformationIfNull === '') {
      parsedMedDraInformation = []
    } else {
      parsedMedDraInformation = emptyMedDraInformationIfNull.split(', ')
    }

    const coding: CodingModel[] = []
    parsedMedDraInformation.forEach((medDRACode) => {
      coding.push(CodingModel.createMedDraCode(medDRACode))
    })

    return new CodeableConceptModel(
      coding,
      undefined,
      'MedDRA Condition'
    )
  }

  static createGenders(genders: string): CodeableConceptModel {
    let parsedGenders: string[]

    if (genders === '') {
      parsedGenders = ['unknown']
    } else {
      parsedGenders = genders.split(',')
    }

    return new CodeableConceptModel(
      parsedGenders.map((parsedGender) => CodingModel.createGender(parsedGender)),
      undefined,
      'Genders'
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyGroupCategory(researchStudyGroupCategory)],
      undefined,
      'Research Study Group Category'
    )
  }

  static createStudyPopulation(studyPopulation: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createStudyPopulation(studyPopulation)],
      undefined,
      'Study Population'
    )
  }

  static createInclusion(studyInclusion: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createInclusion(studyInclusion)],
      undefined,
      'Study Inclusion Criteria'
    )
  }

  static createExclusion(studyExclusion: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createExclusion(studyExclusion)],
      undefined,
      'Study Exclusion Criteria'
    )
  }

  static createGroupCharacteristicCode(code: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createGroupCharacteristicCode(code)],
      undefined,
      'Group characteristic code'
    )
  }

  static createOrganizationContactPurpose(): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createOrganizationContactPurpose()],
      undefined,
      'Organization Contact Purpose'
    )
  }

  static createClinicalResearchSponsor(): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createOrganizationSponsorType()],
      undefined,
      'Organization Sponsor Type'
    )
  }

  static createContactType(contactType: ContactType): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createContactType(contactType)],
      undefined,
      'Contact Type'
    )
  }

  static createLocations(countriesCode: string): CodeableConceptModel[] | undefined {
    const emptyCountriesCodeIfNull = ModelUtils.emptyIfNull(countriesCode)

    if (emptyCountriesCodeIfNull === '') return undefined

    return emptyCountriesCodeIfNull.split(', ').map((countryCode): CodeableConceptModel => {
      return new CodeableConceptModel(
        [CodingModel.createLocation(countryCode)],
        undefined,
        'Countries of recruitment'
      )
    })
  }

  static createLabelType(labelType: LabelType): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createLabelType(labelType)],
      undefined,
      'Label Type'
    )
  }
}
