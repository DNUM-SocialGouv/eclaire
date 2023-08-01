import { CodeableConcept, Group, GroupCharacteristic, GroupMember, Identifier, Meta, Reference } from 'fhir/r4'

import { GroupCharacteristicModel } from './GroupCharacteristicModel'
import { ModelUtils } from '../custom/ModelUtils'

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
    researchStudyGroupCategory: string,
    studyPopulation: string,
    studyInclusion: string,
    studyExclusion: string
  ): GroupModel {
    const emptySexIfNull = ModelUtils.emptyIfNull(sex)
    const emptyAgeRangeIfNull = ModelUtils.emptyIfNull(ageRange)
    const emptyStudySizeIfNull = ModelUtils.emptyNumberIfNull(studySize)
    const emptyResearchStudyGroupCategoryIfNull = ModelUtils.emptyIfNull(researchStudyGroupCategory)
    const emptyStudyPopulationIfNull = ModelUtils.emptyIfNull(studyPopulation)
    const emptyStudyInclusionIfNull = ModelUtils.emptyIfNull(studyInclusion)
    const emptyStudyExclusionIfNull = ModelUtils.emptyIfNull(studyExclusion)

    let parsedAgeRanges: GroupCharacteristic[] = []

    if (emptyAgeRangeIfNull !== '') {
      parsedAgeRanges = emptyAgeRangeIfNull
        .split(', ')
        .map((ageRange: string): GroupCharacteristicModel => GroupCharacteristicModel.createAgeRange(ageRange))
    }

    return new GroupModel(
      undefined,
      true,
      [
        GroupCharacteristicModel.createGender(emptySexIfNull),
        ...parsedAgeRanges,
        GroupCharacteristicModel.createResearchStudyGroupCategory(emptyResearchStudyGroupCategoryIfNull),
        GroupCharacteristicModel.createStudyPopulation(emptyStudyPopulationIfNull),
        GroupCharacteristicModel.createInclusion(emptyStudyInclusionIfNull),
        GroupCharacteristicModel.createExclusion(emptyStudyExclusionIfNull),
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
      emptyStudySizeIfNull,
      'person'
    )
  }
}
