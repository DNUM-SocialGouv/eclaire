import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel } from './CodingModel'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { LabelType } from '../special-purpose-data-types/ExtensionModel'

export class CodeableConceptModel implements CodeableConcept {
  private constructor(
    readonly coding: Coding[] | undefined,
    readonly text: string | undefined
  ) {}

  static createResearchStudyPhase(researchStudyPhase: string): CodeableConcept {
    const emptyResearchStudyPhaseIfNull = ModelUtils.undefinedIfNull(researchStudyPhase)

    return new CodeableConceptModel(
      [CodingModel.createResearchStudyPhase(emptyResearchStudyPhaseIfNull)],
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

  static createMedDraSlice(medDraInformation: string): CodeableConcept[] {
    const emptyMedDraInformationIfNull = ModelUtils.undefinedIfNull(medDraInformation)

    if (ModelUtils.isNotNull(emptyMedDraInformationIfNull)) {
      return emptyMedDraInformationIfNull
        .split(', ')
        .map((code): CodeableConcept => {
          const label = 'N/A'
          return new CodeableConceptModel(
            [CodingModel.createMedDra(code, label)],
            'medDRACondition'
          )
        })
    }

    const emptyMedDraCondition: CodeableConceptModel = new CodeableConceptModel(
      [],
      'medDRACondition'
    )
    return [emptyMedDraCondition]
  }

  static createGenders(genders: string): CodeableConcept {
    let parsedGenders = ['unknown']

    if (ModelUtils.isNotNull(genders)) {
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
    const studyPopulationTranslation: Record<string, string> = {
      INDISPONIBLE: ModelUtils.UNAVAILABLE,
      'Incapacitated population': 'Population en situation de handicap',
      Minors: 'Mineurs',
      'Nursing women': 'Femmes allaitant',
      Other: 'Autres',
      'Pregnant women': 'Femmes enceintes',
      'Subjects in emergency situation': 'Sujets en situation d’urgence',
      'Subjects incapable of giving consent personally': 'Sujets incapables de donner leur consentement personnel',
      'Women of child bearing potential not using contraception': 'Femmes en âge de procréer n’utilisant pas de contraception',
      'Women of child bearing potential using contraception': 'Femmes en âge de procréer utilisant une méthode de contraception',
    }
    let parsedStudyPopulations: string[] = []

    if (ModelUtils.isNotNull(studyPopulation)) {
      parsedStudyPopulations = studyPopulation.split(', ').map((studyPopulation) => studyPopulationTranslation[studyPopulation])
    }

    return new CodeableConceptModel(
      parsedStudyPopulations.map((parsedStudyPopulation): Coding => CodingModel.createStudyPopulation(parsedStudyPopulation)),
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
    return countriesCode.split(', ').map((countryCode): CodeableConcept => {
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
