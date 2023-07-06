import { CodeableConcept, GroupCharacteristic, Period, Quantity, Range, Reference } from 'fhir/r4'

import { CodeableConceptModel } from './DataType/CodeableConceptModel'

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
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      CodeableConceptModel.createGenderGroup(genders),
      undefined,
      undefined,
      undefined
    )
  }
}
