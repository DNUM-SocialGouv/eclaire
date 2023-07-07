import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel } from './CodingModel'

export class CodeableConceptModel implements CodeableConcept {
  constructor(
    readonly coding: Coding[] | undefined,
    readonly id: string | undefined,
    readonly text: string | undefined
  ) {}

  static createResearchStudyPhase(phase_recherche: string) {
    return new CodeableConceptModel(
      [CodingModel.createResearchStudyPhase(phase_recherche)],
      undefined,
      phase_recherche
    )
  }

  static createCategory(reglementationCode: string): CodeableConceptModel {
    return new CodeableConceptModel(
      undefined,
      undefined,
      reglementationCode
    )
  }

  static createDiseaseCondition(disease: string): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createDiseaseCoding(disease)],
      undefined,
      'Disease Condition'
    )
  }

  static createMedDraCondition(medDraInformation: string): CodeableConceptModel {
    let parsedMedDraInformation: string[]

    if (medDraInformation === '') {
      parsedMedDraInformation = []
    } else {
      parsedMedDraInformation = medDraInformation.split(', ')
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

  static createAgeRange(ageRange: string): CodeableConceptModel {
    let parsedAgeRanges: string[]

    if (ageRange === '') {
      parsedAgeRanges = []
    } else {
      parsedAgeRanges = ageRange.split(', ')
    }

    return new CodeableConceptModel(
      parsedAgeRanges.map((parsedAgeRange) => CodingModel.createAgeRange(parsedAgeRange)),
      undefined,
      'Age range'
    )
  }

  static createStudySize(studySize: number) {
    return new CodeableConceptModel(
      [CodingModel.createStudySize(studySize)],
      undefined,
      'Study Size'
    )
  }

  static createStudyCategory(groupes_sujet: string) {
    return new CodeableConceptModel(
      [CodingModel.createStudyCategory(groupes_sujet)],
      undefined,
      'Study Category'
    )
  }

  static createStudyPopulation(population_recrutement: string) {
    return new CodeableConceptModel(
      [CodingModel.createStudyPopulation(population_recrutement)],
      undefined,
      'Study Population'
    )
  }
}
