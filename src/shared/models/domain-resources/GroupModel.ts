import { Group, GroupCharacteristic } from 'fhir/r4'

import { NarrativeModel } from './NarrativeModel'
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
      | 'substance',
    readonly text: { div: string, status: 'extensions' | 'generated' | 'additional' | 'empty' }
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
    judgementCriteria: Critere[],
    text: NarrativeModel
  ): Group {
    const characteristic: GroupCharacteristic[] = []

    if (ModelUtils.isNotNull(genders)) {
      characteristic.push(GroupCharacteristicModel.createGender(genders))
    }

    if (ModelUtils.isNotNull(ageRanges)) {
      const ageRangesCodes = [
        ...new Set(
          ageRanges.map((value) => {
            if (value.toLowerCase().trim() === 'in utero') return '0-17'
            if (value.includes('0-17')) return '0-17'
            if (value.includes('18-64')) return '18-64'
            if (value.includes('65+')) return '65+'
            return null
          }).filter(Boolean) // Remove nulls
        ),
      ]

      if (ModelUtils.isNotNull(ageRangesCodes)) {
        const parsedAgeRanges: GroupCharacteristic[] = ageRangesCodes.map((ageRange): GroupCharacteristic => GroupCharacteristicModel.createAgeRange(ageRange))
        characteristic.push(...parsedAgeRanges)
      }
    }

    if (ModelUtils.isNotNull(researchStudyGroupCategory)) {
      characteristic.push(GroupCharacteristicModel.createResearchStudyGroupCategory(researchStudyGroupCategory))
    }
    if (ModelUtils.isNotNull(studyPopulation)) {
      characteristic.push(GroupCharacteristicModel.createStudyPopulation(studyPopulation))
    }

    /* if (eligibilityCriteria && eligibilityCriteria.length > 0) {
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
    } */
    if (eligibilityCriteria && eligibilityCriteria.length > 0) {
      eligibilityCriteria.forEach((eligibilityCriteria: Critere) => {
        const exclude = eligibilityCriteria.type === 'INCLUSION' ? false : true
        characteristic.push(GroupCharacteristicModel.createDocumentCriteria(eligibilityCriteria.titre, exclude, 'eligibility-criteria'))
      })
    }
    if (judgementCriteria && judgementCriteria.length > 0) {
      judgementCriteria.forEach((judgementCriteria: Critere) => {
        const exclude = judgementCriteria.type === 'PRINCIPAL' ? false : true
        characteristic.push(GroupCharacteristicModel.createDocumentCriteria(judgementCriteria.titre, exclude, 'judgement-criteria'))
      })
    }

    return new GroupModel(
      true,
      characteristic.length === 0 ? undefined : characteristic,
      enrollmentGroupId,
      ModelUtils.isNotNull(studySize) ? studySize : undefined,
      'person',
      text
    )
  }
}
