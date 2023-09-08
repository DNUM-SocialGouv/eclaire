import { Group, GroupCharacteristic } from 'fhir/r4'

import { GroupCharacteristicModel } from '../backbone-elements/GroupCharacteristicModel'
import { ModelUtils } from '../eclaire/ModelUtils'

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

    if (ModelUtils.isNotNull(ageRange)) {
      parsedAgeRanges = ageRange
        .split(', ')
        .map((ageRange): GroupCharacteristic => GroupCharacteristicModel.createAgeRange(ageRange))
    }

    const characteristic: GroupCharacteristic[] = []

    if (ModelUtils.isNotNull(sex)) {
      characteristic.push(GroupCharacteristicModel.createGender(sex))
    }
    if (ModelUtils.isNotNull(ageRange)) {
      characteristic.push(...parsedAgeRanges)
    }
    if (ModelUtils.isNotNull(researchStudyGroupCategory)) {
      characteristic.push(GroupCharacteristicModel.createResearchStudyGroupCategory(researchStudyGroupCategory))
    }
    if (ModelUtils.isNotNull(studyPopulation)) {
      characteristic.push(GroupCharacteristicModel.createStudyPopulation(studyPopulation))
    }
    if (ModelUtils.isNotNull(studyInclusion)) {
      characteristic.push(GroupCharacteristicModel.createInclusion(studyInclusion))
    }
    if (ModelUtils.isNotNull(studyExclusion)) {
      characteristic.push(GroupCharacteristicModel.createExclusion(studyExclusion))
    }

    return new GroupModel(
      true,
      characteristic.length === 0 ? undefined : characteristic,
      enrollmentGroupId,
      ModelUtils.isNotNull(studySize) ? studySize : undefined,
      'person'
    )
  }
}
