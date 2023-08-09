import { CodeableConcept, GroupCharacteristic, Quantity, Range, Reference } from 'fhir/r4'

import { CodeableConceptModel } from '../data-types/CodeableConceptModel'
import { RangeModel } from '../data-types/RangeModel'

export class GroupCharacteristicModel implements GroupCharacteristic {
  constructor(
    readonly code: CodeableConcept,
    readonly exclude: boolean,
    readonly valueBoolean: boolean | undefined,
    readonly valueCodeableConcept: CodeableConcept | undefined,
    readonly valueQuantity: Quantity | undefined,
    readonly valueRange: Range | undefined,
    readonly valueReference: Reference | undefined
  ) {}

  static createGender(genders: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      undefined,
      false,
      undefined,
      CodeableConceptModel.createGenders(genders),
      undefined,
      undefined,
      undefined
    )
  }

  static createAgeRange(ageRange: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      undefined,
      false,
      undefined,
      undefined,
      undefined,
      RangeModel.createAgeRange(ageRange),
      undefined
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      undefined,
      false,
      undefined,
      CodeableConceptModel.createResearchStudyGroupCategory(researchStudyGroupCategory),
      undefined,
      undefined,
      undefined
    )
  }

  static createStudyPopulation(studyPopulation: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      undefined,
      false,
      undefined,
      CodeableConceptModel.createStudyPopulation(studyPopulation),
      undefined,
      undefined,
      undefined
    )
  }

  static createInclusion(studyInclusion: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      undefined,
      false,
      undefined,
      CodeableConceptModel.createInclusion(studyInclusion),
      undefined,
      undefined,
      undefined
    )
  }

  static createExclusion(studyExclusion: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      undefined,
      true,
      undefined,
      CodeableConceptModel.createExclusion(studyExclusion),
      undefined,
      undefined,
      undefined
    )
  }
}
