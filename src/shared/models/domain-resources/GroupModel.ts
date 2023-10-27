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
    genders: string[],
    ageRanges: string[],
    studySize: number,
    researchStudyGroupCategory: string,
    studyPopulation: string[],
    studyInclusion: string,
    studyExclusion: string
  ): Group {
    let parsedAgeRanges: GroupCharacteristic[] = []
    const characteristic: GroupCharacteristic[] = []

    if (ModelUtils.isNotNull(genders)) {
      characteristic.push(GroupCharacteristicModel.createGender(genders))
    }
    if (ModelUtils.isNotNull(ageRanges)) {
      parsedAgeRanges = ageRanges.map((ageRange): GroupCharacteristic => GroupCharacteristicModel.createAgeRange(ageRange))
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
