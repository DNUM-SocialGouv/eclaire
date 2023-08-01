import { CodeableConcept, GroupCharacteristic, Period, Quantity, Range, Reference } from 'fhir/r4'

import { CodeableConceptModel } from './DataType/CodeableConceptModel'
import { RangeModel } from './DataType/RangeModel'
import { ModelUtils } from '../custom/ModelUtils'

export class GroupCharacteristicModel implements GroupCharacteristic {
  constructor(
    readonly code: CodeableConcept,
    readonly exclude: boolean,
    readonly id: string | undefined,
    readonly period: Period | undefined,
    readonly valueBoolean: boolean | undefined,
    readonly valueCodeableConcept: CodeableConcept | undefined,
    readonly valueQuantity: Quantity | undefined,
    readonly valueRange: Range | undefined,
    readonly valueReference: Reference | undefined
  ) {}

  static createGender(genders: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createGenders(genders),
      undefined,
      undefined,
      undefined
    )
  }

  static createAgeRange(ageRange: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      RangeModel.createAgeRange(ageRange),
      undefined
    )
  }

  static createStudySize(studySize: number): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createStudySize(studySize),
      undefined,
      undefined,
      undefined
    )
  }

  static createResearchStudyGroupCategory(researchStudyGroupCategory: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createResearchStudyGroupCategory(researchStudyGroupCategory),
      undefined,
      undefined,
      undefined
    )
  }

  static createStudyPopulation(studyPopulation: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createStudyPopulation(studyPopulation),
      undefined,
      undefined,
      undefined
    )
  }

  static createInclusion(studyInclusion: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createInclusion(studyInclusion),
      undefined,
      undefined,
      undefined
    )
  }

  static createExclusion(studyExclusion: string): GroupCharacteristicModel {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      true,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createExclusion(studyExclusion),
      undefined,
      undefined,
      undefined
    )
  }
}
