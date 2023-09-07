import { Group, GroupCharacteristic } from 'fhir/r4'

import { GroupCharacteristicModel } from '../backbone-elements/GroupCharacteristicModel'

export class GroupModel implements Group {
  readonly resourceType: 'Group'
  private constructor(
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
    let parsedAgeRanges: GroupCharacteristic[] = []

    if (ageRange !== null) {
      parsedAgeRanges = ageRange
        .split(', ')
        .map((ageRange): GroupCharacteristic => GroupCharacteristicModel.createAgeRange(ageRange))
    }

    const characteristic: GroupCharacteristic[] = []

    if (sex !== null) {
      characteristic.push(GroupCharacteristicModel.createGender(sex))
    }
    if (ageRange !== null) {
      characteristic.push(...parsedAgeRanges)
    }
    if (researchStudyGroupCategory !== null) {
      characteristic.push(GroupCharacteristicModel.createResearchStudyGroupCategory(researchStudyGroupCategory))
    }
    if (studyPopulation !== null) {
      characteristic.push(GroupCharacteristicModel.createStudyPopulation(studyPopulation))
    }
    if (studyInclusion !== null) {
      characteristic.push(GroupCharacteristicModel.createInclusion(studyInclusion))
    }
    if (studyExclusion !== null) {
      characteristic.push(GroupCharacteristicModel.createExclusion(studyExclusion))
    }

    return new GroupModel(
      true,
      characteristic.length === 0 ? undefined : characteristic,
      enrollmentGroupId,
      studySize !== null ? studySize : undefined,
      'person'
    )
  }
}
