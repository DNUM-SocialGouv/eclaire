import { CodeableConcept, GroupCharacteristic, Quantity, Range, Reference } from 'fhir/r4'

import { CodeableConceptModel } from '../data-types/CodeableConceptModel'
import { RangeModel } from '../data-types/RangeModel'

export class GroupCharacteristicModel implements GroupCharacteristic {
  private constructor(
    readonly code: CodeableConcept,
    readonly exclude: boolean | undefined,
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
      undefined,
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
      undefined,
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
      undefined,
      undefined,
      CodeableConceptModel.createResearchStudyGroupCategory(researchStudyGroupCategory),
      undefined,
      undefined,
      undefined
    )
  }

  static createStudyPopulation(studyPopulation: string[], exclude: boolean, type: string): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-studypop'),
      exclude,
      undefined,
      CodeableConceptModel.createStudyPopulation(studyPopulation),
      undefined,
      undefined,
      undefined,
      type
    )
  }

  static createDocumentCriteria(studyInclusion: string, exclude: boolean | undefined, type: 'eligibility-criteria' | 'judgement-criteria'): GroupCharacteristic {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicKindVs('grp-other'),
      exclude,
      undefined,
      exclude ? CodeableConceptModel.createExclusion(studyInclusion) : CodeableConceptModel.createInclusion(studyInclusion),
      undefined,
      undefined,
      undefined,
      type
    )
  }

}
