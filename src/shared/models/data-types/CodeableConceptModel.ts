import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel, EclaireGroupCharacteristicKindVsReferenceCode } from './CodingModel'
import { MedDra } from '../../../etl/dto/EclaireDto'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { LabelType } from '../special-purpose-data-types/ExtensionModel'

export class CodeableConceptModel implements CodeableConcept {
  private constructor(
    readonly coding: Coding[] | undefined,
    readonly text?: string | undefined
  ) {}

  static createResearchStudyPhase(researchStudyPhase: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyPhase(researchStudyPhase)]
    )
  }

  static createRegulationCode(regulationCode: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createRegulationCode(regulationCode)]
    )
  }

  static createReglementationPrecision(reglementationPrecision: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createReglementationPrecision(reglementationPrecision)]
    )
  }

  static createDiseaseSlice(disease: string): CodeableConcept {
    const emptyDiseaseIfNull = ModelUtils.undefinedIfNull(disease)

    return new CodeableConceptModel(
      undefined,
      emptyDiseaseIfNull
    )
  }

  static createMedDraSlice(medDraInformation: MedDra[]): CodeableConcept[] {
    return medDraInformation.map((medDra): CodeableConcept => {
      return new CodeableConceptModel(
        [CodingModel.createMedDra(medDra.code, medDra.label)]
      )
    })
  }

  static createGenders(genders: string[]): CodeableConcept {
    return new CodeableConceptModel(
      genders.map((gender): Coding => CodingModel.createGender(gender))
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyGroupCategory(researchStudyGroupCategory)]
    )
  }

  static createStudyPopulation(studyPopulation: string[]): CodeableConcept {
    return new CodeableConceptModel(
      studyPopulation.map((parsedStudyPopulation): Coding => CodingModel.createStudyPopulation(parsedStudyPopulation))
    )
  }

  static createInclusion(studyInclusion: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createInclusion(studyInclusion)]
    )
  }

  static createExclusion(studyExclusion: string): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createExclusion(studyExclusion)]
    )
  }

  static createOrganizationContactPurpose(): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createOrganizationContactPurpose()]
    )
  }

  static createClinicalResearchSponsor(): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createOrganizationSponsorType()]
    )
  }

  static createContactType(contactType: ContactType): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createContactType(contactType)]
    )
  }

  static createLocations(countriesCode: string[]): CodeableConcept[] {
    return countriesCode.map((countryCode): CodeableConcept => {
      return new CodeableConceptModel(
        [CodingModel.createLocation(countryCode)]
      )
    })
  }

  static createLabelType(labelType: LabelType): CodeableConcept {
    return new CodeableConceptModel(
      [CodingModel.createLabelType(labelType)]
    )
  }

  static createGroupCharacteristicKindVs(referenceCode: EclaireGroupCharacteristicKindVsReferenceCode): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createGroupCharacteristicKindVs(referenceCode)]
    )
  }
}
