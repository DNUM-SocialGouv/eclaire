import { CodeableConcept, Coding } from 'fhir/r4'

import { CodingModel } from './CodingModel'
import { ModelUtils } from '../../custom/ModelUtils'

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

  static createStudySize(studySize: number): CodeableConceptModel {
    return new CodeableConceptModel(
      [CodingModel.createStudySize(studySize)],
      undefined,
      'Study Size'
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
}
