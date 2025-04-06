import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel, EclaireGroupCharacteristicKindVsReferenceCode } from './CodingModel'
import { MedDra } from '../../../etl/dto/EclaireDto'
import { RiphStatus } from '../domain-resources/ResearchStudyModel'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { LabelType } from '../special-purpose-data-types/ExtensionModel'

export class CodeableConceptModel implements CodeableConcept {
  private constructor(
    readonly id: string | undefined,
    readonly coding: Coding[] | undefined,
    readonly text: string | undefined
  ) {}

  static createResearchStudyPhase(researchStudyPhase: string): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createResearchStudyPhase(researchStudyPhase)],
      undefined
    )
  }

  static createRegulationCode(regulationCode: string): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createRegulationCode(regulationCode)],
      undefined
    )
  }

  static createReglementationPrecision(reglementationPrecision: string): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createReglementationPrecision(reglementationPrecision)],
      undefined
    )
  }

  static createDiseaseSlice(id: string, disease: string): CodeableConcept {
    const emptyDiseaseIfNull = ModelUtils.undefinedIfNull(disease)

    return new CodeableConceptModel(
      'disease-condition-' + id,
      undefined,
      emptyDiseaseIfNull
    )
  }

  static createMedDraSlice(id: string, medDraInformation: MedDra[]): CodeableConcept[] {
    return medDraInformation.map((medDra): CodeableConcept => {
      return new CodeableConceptModel(
        'meddra-condition-' + id + '-' + medDra.code,
        [CodingModel.createMedDra(medDra.code, medDra.label)],
        undefined
      )
    })
  }

  static createGenders(genders: string[]): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      genders.map((gender): Coding => CodingModel.createGender(gender)),
      undefined
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createResearchStudyGroupCategory(researchStudyGroupCategory)],
      undefined
    )
  }

  static createStudyPopulation(studyPopulation: string[]): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      studyPopulation.map((parsedStudyPopulation): Coding => CodingModel.createStudyPopulation(parsedStudyPopulation)),
      undefined
    )
  }

  static createInclusion(studyInclusion: string): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createInclusion(studyInclusion)],
      undefined
    )
  }

  static createExclusion(studyExclusion: string): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createExclusion(studyExclusion)],
      undefined
    )
  }

  static createOrganizationContactPurpose(): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createOrganizationContactPurpose()],
      undefined
    )
  }

  static createClinicalResearchSponsor(): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createOrganizationSponsorType()],
      undefined
    )
  }

  static createContactType(contactType: ContactType): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createContactType(contactType)],
      undefined
    )
  }

  static createLocations(countriesCode: string[]): CodeableConcept[] {
    return countriesCode.map((countryCode): CodeableConcept => {
      return new CodeableConceptModel(
        undefined,
        [CodingModel.createLocation(countryCode)],
        undefined
      )
    })
  }

  static createLabelType(labelType: LabelType): CodeableConcept {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createLabelType(labelType)],
      undefined
    )
  }

  static createGroupCharacteristicKindVs(referenceCode: EclaireGroupCharacteristicKindVsReferenceCode): CodeableConceptModel {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createGroupCharacteristicKindVs(referenceCode)],
      undefined
    )
  }

  static createRecruitmentStatus(status: RiphStatus): CodeableConceptModel {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createRecruitmentStatus(status)],
      undefined
    )
  }

  static createEclaireAssociatedPartyR5Role(role: string) {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createEclaireAssociatedPartyR5Role(role)],
      undefined
    )
  }

  static createEclaireAssociatedPartyR5Classifier(classifier: string) {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createEclaireAssociatedPartyR5Classifier(classifier)],
      undefined
    )
  }

  static createPrimaryPurposeType(objectifs: string) {
    return new CodeableConceptModel(
      undefined,
      undefined,
      objectifs
    )
  }
}
