import { CodeableConcept, GroupCharacteristic, Quantity, Range, Reference } from 'fhir/r4'

import { CodeableConceptModel } from '../data-types/CodeableConceptModel'
import { RangeModel } from '../data-types/RangeModel'

export class GroupCharacteristicModel implements GroupCharacteristic {
  private constructor(
    readonly code: CodeableConcept,
    readonly exclude: boolean,
    readonly valueBoolean: boolean | undefined,
    readonly valueCodeableConcept: CodeableConcept | undefined,
    readonly valueQuantity: Quantity | undefined,
    readonly valueRange: Range | undefined,
    readonly valueReference: Reference | undefined,
    readonly description?: string | undefined
  ) {}

  static createGender(genders: string[]): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-gender'),
      false,
      undefined,
      CodeableConceptModel.createGenders(genders),
      undefined,
      undefined,
      undefined
    )
  }

  static createAgeRange(ageRange: string): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-age'),
      false,
      undefined,
      undefined,
      undefined,
      RangeModel.createAgeRange(ageRange),
      undefined
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-category'),
      false,
      undefined,
      CodeableConceptModel.createResearchStudyGroupCategory(researchStudyGroupCategory),
      undefined,
      undefined,
      undefined
    )
  }

  static createStudyPopulation(studyPopulation: string[]): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-studypop'),
      false,
      undefined,
      CodeableConceptModel.createStudyPopulation(studyPopulation),
      undefined,
      undefined,
      undefined
    )
  }

  static createDocumentCriteria(studyInclusion: string, exclude: boolean, type: 'eligibility-criteria' | 'judgement-criteria'): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-other', type),
      exclude,
      undefined,
      exclude ? CodeableConceptModel.createExclusion(studyInclusion) : CodeableConceptModel.createInclusion(studyInclusion),
      undefined,
      undefined,
      undefined,
      type
    )
  }

  /* static createInclusion(studyInclusion: string): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-other'),
      false,
      undefined,
      CodeableConceptModel.createInclusion(studyInclusion),
      undefined,
      undefined,
      undefined
    )
  }

  static createExclusion(studyExclusion: string): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-other'),
      true,
      undefined,
      CodeableConceptModel.createExclusion(studyExclusion),
      undefined,
      undefined,
      undefined
    )
  }

  static createPrincipal(value: string) {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-other'),
      false,
      undefined,
      CodeableConceptModel.createPrincipal(value),
      undefined,
      undefined,
      undefined
    )
  }

  static createSecondary(value: string) {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-other'),
      true,
      undefined,
      CodeableConceptModel.createSecondary(value),
      undefined,
      undefined,
      undefined
    )
  } */
}
