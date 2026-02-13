import { integer } from '@elastic/elasticsearch/api/types'
import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel, EclaireGroupCharacteristicKindVsReferenceCode } from './CodingModel'
import { MedDra } from '../../../etl/dto/EclaireDto'
import { researchStudyPhaseCodeSystem } from '../code-systems/researchStudyPhaseCodeSystem'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { LabelType } from '../special-purpose-data-types/ExtensionModel'

export class CodeableConceptModel implements CodeableConcept {
  private constructor(
    readonly id: string | undefined,
    readonly coding: Coding[] | undefined,
    readonly text?: string | undefined
  ) { }

  private static findIndexPhaseInCodeSystems(phase: string): { index: integer } {
    let index: number

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
        index = 6
        break
      default:
        index = 0
        break
    }

    return { index }
  }

  static createResearchStudyPhase(researchStudyPhase: string): CodeableConcept {
    const { index } = this.findIndexPhaseInCodeSystems(researchStudyPhase)

    return new CodeableConceptModel(
      undefined,
      [CodingModel.createResearchStudyPhase(index)],
      researchStudyPhaseCodeSystem.concept[index].definition
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
      /* eslint-disable sort-keys */
      const obj: CodeableConcept = {
        id: 'meddra-condition-' + id + '-' + medDra.code,
        coding: [CodingModel.createMedDra(medDra.code, medDra.label)],
      }
      /* eslint-enable sort-keys */
      return obj
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

  static createGroupCharacteristicKindVs(referenceCode: EclaireGroupCharacteristicKindVsReferenceCode, text?: string): CodeableConceptModel {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createGroupCharacteristicKindVs(referenceCode)],
      text ? text : undefined
    )
  }

  static createRecruitmentStatus(status: string): CodeableConceptModel {
    const statusMap = {
      'RECRUTEMENT EN ATTENTE': 'upcoming',
      'RECRUTEMENT FERMÉ': 'completed-recruiting',
      'RECRUTEMENT OUVERT': 'recruiting',
    }
    const statusRecru = statusMap[status.toUpperCase()] ?? status

    return new CodeableConceptModel(
      undefined,
      [CodingModel.createRecruitmentStatus(statusRecru)],
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
      [CodingModel.createEclairePrimaryPurposeType()],
      objectifs
    )
  }

  static createPrincipal(value: string) {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createPrincipal(value)],
      undefined
    )
  }

  static createSecondary(value: string) {
    return new CodeableConceptModel(
      undefined,
      [CodingModel.createSecondary(value)],
      undefined
    )
  }
}
