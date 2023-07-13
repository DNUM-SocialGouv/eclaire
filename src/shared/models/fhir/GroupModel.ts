import { CodeableConcept, Group, GroupCharacteristic, GroupMember, Identifier, Meta, Reference } from 'fhir/r4'

import { GroupCharacteristicModel } from './GroupCharacteristicModel'
import { ModelUtils } from './ModelUtils'

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
    readonly type:
      | 'person'
      | 'animal'
      | 'practitioner'
      | 'device'
      | 'medication'
      | 'substance'
  ) {
    this.resourceType = 'Group'
  }

  static createStudyCharacteristics(
    enrollmentGroupId: string,
    sex: string,
    ageRange: string,
    studySize: number,
    studyCategory: string,
    studyPopulation: string
  ): GroupModel {
    const emptySexIfNull = ModelUtils.emptyIfNull(sex)
    const emptyAgeRangeIfNull = ModelUtils.emptyIfNull(ageRange)
    const emptyStudySizeIfNull = ModelUtils.emptyNumberIfNull(studySize)
    const emptyStudyCategoryIfNull = ModelUtils.emptyIfNull(studyCategory)
    const emptyStudyPopulationIfNull = ModelUtils.emptyIfNull(studyPopulation)

    return new GroupModel(
      undefined,
      true,
      [
        GroupCharacteristicModel.createGender(emptySexIfNull),
        GroupCharacteristicModel.createAgeRange(emptyAgeRangeIfNull),
        GroupCharacteristicModel.createStudySize(emptyStudySizeIfNull),
        GroupCharacteristicModel.createStudyCategory(emptyStudyCategoryIfNull),
        GroupCharacteristicModel.createStudyPopulation(emptyStudyPopulationIfNull),
      ],
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
