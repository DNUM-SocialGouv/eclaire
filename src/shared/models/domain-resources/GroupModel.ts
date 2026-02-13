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
    studyPopulation: (string | boolean)[],
    eligibilityCriteria: Critere[],
    judgementCriteria: Critere[],
    text: NarrativeModel,
    typeReglementation : 'CTIS' | 'OTHER'
  ): Group {
    const characteristic: GroupCharacteristic[] = []

    if (ModelUtils.filterEmptyAndCheck(genders).hasValue) {
      characteristic.push(GroupCharacteristicModel.createGender(ModelUtils.filterEmptyAndCheck(genders).values))
    }

    if (ModelUtils.filterEmptyAndCheck(ageRanges).hasValue) {
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

    if (ModelUtils.filterEmptyAndCheck(studyPopulation).hasValue) {
      const type = typeReglementation === 'CTIS' ? 'recruitment_population' : 'vulnerable_population'
      const exclude = typeReglementation === 'OTHER' && studyPopulation[0] ? true : typeReglementation === 'OTHER' && !studyPopulation[0] ? false : undefined
      characteristic.push(GroupCharacteristicModel.createStudyPopulation(ModelUtils.filterEmptyAndCheck(studyPopulation).values, exclude, type ))
    }

    if (ModelUtils.filterValidItems(eligibilityCriteria).hasData) {
      ModelUtils.filterValidItems(eligibilityCriteria).values.forEach((item: Critere) => {
        const exclude = item.type === 'INCLUSION' ? false : true
        characteristic.push(GroupCharacteristicModel.createDocumentCriteria(item.titre, exclude, 'eligibility-criteria'))
      })
    }

    if (ModelUtils.filterValidItems(judgementCriteria).hasData) {
      ModelUtils.filterValidItems(judgementCriteria).values.forEach((item: Critere) => {
        const exclude = item.type === 'PRINCIPAL' ? false : true
        characteristic.push(GroupCharacteristicModel.createDocumentCriteria(item.titre, exclude, 'judgement-criteria'))
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
