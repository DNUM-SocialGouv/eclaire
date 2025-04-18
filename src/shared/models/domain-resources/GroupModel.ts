import { Group, GroupCharacteristic } from 'fhir/r4'

import { Critere } from '../../../etl/dto/EclaireDto'
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
    eligibilityCriteria: Critere[],
    judgementCriteria: Critere[]
  ): Group {
    const characteristic: GroupCharacteristic[] = []

    if (ModelUtils.isNotNull(genders)) {
      characteristic.push(GroupCharacteristicModel.createGender(genders))
    }
    if (ModelUtils.isNotNull(ageRanges)) {
      const parsedAgeRanges: GroupCharacteristic[] = ageRanges.map((ageRange): GroupCharacteristic => GroupCharacteristicModel.createAgeRange(ageRange))
      characteristic.push(...parsedAgeRanges)
    }
    if (ModelUtils.isNotNull(researchStudyGroupCategory)) {
      characteristic.push(GroupCharacteristicModel.createResearchStudyGroupCategory(researchStudyGroupCategory))
    }
    if (ModelUtils.isNotNull(studyPopulation)) {
      characteristic.push(GroupCharacteristicModel.createStudyPopulation(studyPopulation))
    }

    if (eligibilityCriteria && eligibilityCriteria.length > 0) {
      eligibilityCriteria.forEach((eligibilityCriteria: Critere) => {
        if (eligibilityCriteria.type === 'INCLUSION') {
          characteristic.push(GroupCharacteristicModel.createInclusion(eligibilityCriteria.titre))
        }

        if (eligibilityCriteria.type === 'EXCLUSION') {
          characteristic.push(GroupCharacteristicModel.createExclusion(eligibilityCriteria.titre))
        }
      })
    }

    if (judgementCriteria && judgementCriteria.length > 0) {
      judgementCriteria.forEach((judgementCriteria: Critere) => {
        if (judgementCriteria.type === 'PRINCIPAL') {
          characteristic.push(GroupCharacteristicModel.createPrincipal(judgementCriteria.titre))
        }

        if (judgementCriteria.type === 'SECONDAIRE') {
          characteristic.push(GroupCharacteristicModel.createSecondary(judgementCriteria.titre))
        }
      })
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
