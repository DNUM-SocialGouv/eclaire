import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel } from './CodingModel'
import { ModelUtils } from '../../custom/ModelUtils'
import { ContactType } from '../MetadataType/ContactDetailModel'
import { LabelType } from '../SpecialPurposeDataType/ExtensionModel'

export class CodeableConceptModel implements CodeableConcept {
  constructor(
    readonly coding: Coding[] | undefined,
    readonly text: string | undefined
  ) {}

  static createResearchStudyPhase(researchStudyPhase: string): CodeableConceptModel {
    const emptyResearchStudyPhaseIfNull = ModelUtils.emptyIfNull(researchStudyPhase)

    return new CodeableConceptModel(
      [CodingModel.createResearchStudyPhase(emptyResearchStudyPhaseIfNull)],
      'Research Study Phase'
    )
  }

  static createCategory(regulationCode: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createRegulationCode(regulationCode)],
      'Regulation Code'
    )
  }

  static createDiseaseCondition(disease: string): CodeableConceptModel {
    const emptyDiseaseIfNull = ModelUtils.emptyIfNull(disease)

    return new CodeableConceptModel(
      [CodingModel.createDiseaseCoding(emptyDiseaseIfNull)],
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
      'Genders'
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyGroupCategory(researchStudyGroupCategory)],
      'Research Study Group Category'
    )
  }

  static createStudyPopulation(studyPopulation: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createStudyPopulation(studyPopulation)],
      'Study Population'
    )
  }

  static createInclusion(studyInclusion: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createInclusion(studyInclusion)],
      'Study Inclusion Criteria'
    )
  }

  static createExclusion(studyExclusion: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createExclusion(studyExclusion)],
      'Study Exclusion Criteria'
    )
  }

  static createGroupCharacteristicCode(code: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createGroupCharacteristicCode(code)],
      'Group characteristic code'
    )
  }

  static createOrganizationContactPurpose(): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createOrganizationContactPurpose()],
      'Organization Contact Purpose'
    )
  }

  static createClinicalResearchSponsor(): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createOrganizationSponsorType()],
      'Organization Sponsor Type'
    )
  }

  static createContactType(contactType: ContactType): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createContactType(contactType)],
      'Contact Type'
    )
  }

  static createLocations(countriesCode: string): CodeableConceptModel[] | undefined {
    const emptyCountriesCodeIfNull = ModelUtils.emptyIfNull(countriesCode)

    if (emptyCountriesCodeIfNull === '') return undefined

    return emptyCountriesCodeIfNull.split(', ').map((countryCode): CodeableConceptModel => {
      return new CodeableConceptModel(
        [CodingModel.createLocation(countryCode)],

        'Countries of recruitment'
      )
    })
  }

  static createLabelType(labelType: LabelType): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createLabelType(labelType)],
      'Label Type'
    )
  }
}
