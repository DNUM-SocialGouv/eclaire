import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel } from './CodingModel'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { LabelType } from '../special-purpose-data-types/ExtensionModel'

export class CodeableConceptModel implements CodeableConcept {
  constructor(
    readonly coding: Coding[] | undefined,
    readonly text: string | undefined
  ) {}

  static createResearchStudyPhase(researchStudyPhase: string): CodeableConcept {
    const emptyResearchStudyPhaseIfNull = ModelUtils.emptyIfNull(researchStudyPhase)

    return new CodeableConceptModel(
      [CodingModel.createResearchStudyPhase(emptyResearchStudyPhaseIfNull)],
      'Research Study Phase'
    )
  }

  static createCategory(regulationCode: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createRegulationCode(regulationCode)],
      'Regulation Code'
    )
  }

  static createDiseaseCondition(disease: string): CodeableConcept {
    const emptyDiseaseIfNull = ModelUtils.emptyIfNull(disease)

    return new CodeableConceptModel(
      [CodingModel.createDiseaseCoding(emptyDiseaseIfNull)],
      'Disease Condition'
    )
  }

  static createMedDraCondition(medDraInformation: string): CodeableConcept {
    const emptyMedDraInformationIfNull = ModelUtils.emptyIfNull(medDraInformation)
    let coding: Coding[] = []

    if (emptyMedDraInformationIfNull !== ModelUtils.NULL_IN_SOURCE) {
      coding = emptyMedDraInformationIfNull
        .split(', ')
        .map((medDRACode): Coding => CodingModel.createMedDraCode(medDRACode))
    }

    return new CodeableConceptModel(
      coding,
      'MedDRA Condition'
    )
  }

  static createGenders(genders: string): CodeableConcept {
    let parsedGenders: string[] = ['unknown']

    if (genders !== ModelUtils.NULL_IN_SOURCE) {
      parsedGenders = genders.split(',')
    }

    return new CodeableConceptModel(
      parsedGenders.map((parsedGender): Coding => CodingModel.createGender(parsedGender)),
      'Genders'
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyGroupCategory(researchStudyGroupCategory)],
      'Research Study Group Category'
    )
  }

  static createStudyPopulation(studyPopulation: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createStudyPopulation(studyPopulation)],
      'Study Population'
    )
  }

  static createInclusion(studyInclusion: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createInclusion(studyInclusion)],
      'Study Inclusion Criteria'
    )
  }

  static createExclusion(studyExclusion: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createExclusion(studyExclusion)],
      'Study Exclusion Criteria'
    )
  }

  static createOrganizationContactPurpose(): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createOrganizationContactPurpose()],
      'Organization Contact Purpose'
    )
  }

  static createClinicalResearchSponsor(): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createOrganizationSponsorType()],
      'Organization Sponsor Type'
    )
  }

  static createContactType(contactType: ContactType): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createContactType(contactType)],
      'Contact Type'
    )
  }

  static createLocations(countriesCode: string): CodeableConcept[] | undefined {
    const emptyCountriesCodeIfNull = ModelUtils.emptyIfNull(countriesCode)

    if (emptyCountriesCodeIfNull === ModelUtils.NULL_IN_SOURCE) return undefined

    return emptyCountriesCodeIfNull.split(', ').map((countryCode): CodeableConcept => {
      return new CodeableConceptModel(
        [CodingModel.createLocation(countryCode)],
        'Countries of recruitment'
      )
    })
  }

  static createLabelType(labelType: LabelType): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createLabelType(labelType)],
      'Label Type'
    )
  }
}
