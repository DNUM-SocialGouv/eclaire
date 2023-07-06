import { CodeableConcept, Group, GroupCharacteristic, GroupMember, Identifier, Meta, Reference } from 'fhir/r4'

import { GroupCharacteristicModel } from './GroupCharacteristicModel'

export class GroupModel implements Group {
  readonly resourceType: 'Group'
  constructor(
    readonly active: boolean | undefined,
    readonly actual: boolean,
    readonly characteristic: GroupCharacteristic[] | undefined,
    readonly code: CodeableConcept | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly implicitRules: string | undefined,
    readonly language: string | undefined,
    readonly managingEntity: Reference | undefined,
    readonly member: GroupMember[] | undefined,
    readonly meta: Meta | undefined,
    readonly name: string | undefined,
    readonly quantity: number | undefined,
    readonly type: 'person' | 'animal' | 'practitioner' | 'device' | 'medication' | 'substance'
  ) {}

  static createEnrollment(
    enrollmentGroupId: string | undefined,
    sex: string,
    ageRange: string,
    range: number,
    groupes_sujet: string,
    population_recrutement: string
  ) {
    return new GroupModel(
      undefined,
      true,
      [GroupCharacteristicModel.createGender(sex)],
      undefined,
      enrollmentGroupId,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      'person'
    )
  }
}
