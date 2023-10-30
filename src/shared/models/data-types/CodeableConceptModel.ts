import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel } from './CodingModel'
import { MedDra } from '../../../etl/dto/EclaireDto'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { LabelType } from '../special-purpose-data-types/ExtensionModel'

export class CodeableConceptModel implements CodeableConcept {
  private constructor(
    readonly coding: Coding[] | undefined,
    readonly text: string | undefined
  ) {}

  static createResearchStudyPhase(researchStudyPhase: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyPhase(researchStudyPhase)],
      'Research Study Phase'
    )
  }

  static createRegulationCode(regulationCode: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createRegulationCode(regulationCode)],
      'Regulation Code'
    )
  }

  static createReglementationPrecision(reglementationPrecision: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createReglementationPrecision(reglementationPrecision)],
      'Reglementation Precision'
    )
  }

  static createDiseaseSlice(disease: string): CodeableConcept {
    const emptyDiseaseIfNull = ModelUtils.undefinedIfNull(disease)

    return new CodeableConceptModel(
      [CodingModel.createDisease(emptyDiseaseIfNull)],
      'diseaseCondition'
    )
  }

  static createMedDraSlice(medDraInformation: MedDra[]): CodeableConcept[] {
    return medDraInformation.map((medDra): CodeableConcept => {
      return new CodeableConceptModel(
        [CodingModel.createMedDra(medDra.code, medDra.label)],
        'medDRACondition'
      )
    })
  }

  static createGenders(genders: string[]): CodeableConcept {
    return new CodeableConceptModel(
      genders.map((gender): Coding => CodingModel.createGender(gender)),
      'Genders'
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyGroupCategory(researchStudyGroupCategory)],
      'Research Study Group Category'
    )
  }

  static createStudyPopulation(studyPopulation: string[]): CodeableConcept {
    return new CodeableConceptModel(
      studyPopulation.map((parsedStudyPopulation): Coding => CodingModel.createStudyPopulation(parsedStudyPopulation)),
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

  static createLocations(countriesCode: string[]): CodeableConcept[] {
    return countriesCode.map((countryCode): CodeableConcept => {
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
