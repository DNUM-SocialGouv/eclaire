import { CodeableConcept, GroupCharacteristic, Period, Quantity, Range, Reference } from 'fhir/r4'

import { CodeableConceptModel } from './DataType/CodeableConceptModel'
import { ModelUtils } from './ModelUtils'

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

  static createGender(genders: string) {
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

  static createAgeRange(ageRange: string) {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createAgeRange(ageRange),
      undefined,
      undefined,
      undefined
    )
  }

  static createStudySize(studySize: number) {
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

  static createStudyCategory(groupes_sujet: string) {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createStudyCategory(groupes_sujet),
      undefined,
      undefined,
      undefined
    )
  }

  static createStudyPopulation(population_recrutement: string) {
    return new GroupCharacteristicModel(
      CodeableConceptModel.createGroupCharacteristicCode(ModelUtils.UNAVAILABLE),
      false,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createStudyPopulation(population_recrutement),
      undefined,
      undefined,
      undefined
    )
  }
}
