import { Group, GroupCharacteristic } from 'fhir/r4'

import { GroupCharacteristicModel } from '../backbone-elements/GroupCharacteristicModel'
import { ModelUtils } from '../eclaire/ModelUtils'

export class GroupModel implements Group {
  readonly resourceType: 'Group'
  constructor(
    readonly actual: boolean,
    readonly characteristic: GroupCharacteristic[] | undefined,
    readonly id: string | undefined,
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
  ): Group {
    const emptySexIfNull = ModelUtils.emptyIfNull(sex)
    const emptyAgeRangeIfNull = ModelUtils.emptyIfNull(ageRange)
    const emptyStudySizeIfNull = ModelUtils.emptyNumberIfNull(studySize)
    const emptyResearchStudyGroupCategoryIfNull = ModelUtils.emptyIfNull(researchStudyGroupCategory)
    const emptyStudyPopulationIfNull = ModelUtils.emptyIfNull(studyPopulation)
    const emptyStudyInclusionIfNull = ModelUtils.emptyIfNull(studyInclusion)
    const emptyStudyExclusionIfNull = ModelUtils.emptyIfNull(studyExclusion)

    let parsedAgeRanges: GroupCharacteristic[] = []

    if (emptyAgeRangeIfNull !== ModelUtils.NULL_IN_SOURCE) {
      parsedAgeRanges = emptyAgeRangeIfNull
        .split(', ')
        .map((ageRange): GroupCharacteristic => GroupCharacteristicModel.createAgeRange(ageRange))
    }

    return new GroupModel(
      true,
      [
        GroupCharacteristicModel.createGender(emptySexIfNull),
        ...parsedAgeRanges,
        GroupCharacteristicModel.createResearchStudyGroupCategory(emptyResearchStudyGroupCategoryIfNull),
        GroupCharacteristicModel.createStudyPopulation(emptyStudyPopulationIfNull),
        GroupCharacteristicModel.createInclusion(emptyStudyInclusionIfNull),
        GroupCharacteristicModel.createExclusion(emptyStudyExclusionIfNull),
      ],
      enrollmentGroupId,
      emptyStudySizeIfNull,
      'person'
    )
  }
}
