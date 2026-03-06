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

  private static addGender(characteristic: GroupCharacteristic[], genders: string[]) {
    if (ModelUtils.filterEmptyAndCheck(genders).hasValue) {
      characteristic.push(GroupCharacteristicModel.createGender(ModelUtils.filterEmptyAndCheck(genders).values))
    }
  }

  private static normalizeAgeRange(value: string): string | null {
    const v = value.toLowerCase().trim()

    if (v === 'in utero' || value.includes('0-17')) return '0-17'
    if (value.includes('18-64')) return '18-64'
    if (value.includes('65+')) return '65+'

    return null
  }

  private static addAgeRanges(characteristic: GroupCharacteristic[], ageRanges: string[]) {
    if (ModelUtils.filterEmptyAndCheck(ageRanges).hasValue) {
      const codes = [
        ...new Set(
          ageRanges
            .map((value) => this.normalizeAgeRange(value))
            .filter(Boolean)
        ),
      ]

      if (ModelUtils.isNotNull(codes)) {
        characteristic.push(
          ...codes.map((code) => GroupCharacteristicModel.createAgeRange(code))
        )
      }
    }
  }

  private static addGroupCategory(characteristic: GroupCharacteristic[], category: string) {
    if (ModelUtils.isNotNull(category)) {
      characteristic.push(
        GroupCharacteristicModel.createResearchStudyGroupCategory(category)
      )
    }
  }

  private static addStudyPopulation(characteristic: GroupCharacteristic[], population: (string | boolean)[], typeReglementation: 'CTIS' | 'OTHER') {
    if (ModelUtils.filterEmptyAndCheck(population).hasValue) {
      const type = typeReglementation === 'CTIS' ? 'recruitment_population' : 'vulnerable_population'
      let exclude: boolean | undefined

      if (typeReglementation === 'OTHER') {
        exclude = !!population[0]
      } else {
        exclude = undefined
      }

      characteristic.push(GroupCharacteristicModel.createStudyPopulation(ModelUtils.filterEmptyAndCheck(population).values, exclude, type))
    }
  }

  private static addCriteria(
    characteristic: GroupCharacteristic[],
    criteria: Critere[],
    includeType: string,
    category: 'eligibility-criteria' | 'judgement-criteria'
  ) {
    if (ModelUtils.filterValidItems(criteria).hasData) {
      ModelUtils.filterValidItems(criteria).values.forEach((item: Critere) => {
        const exclude = item.type !== includeType
        characteristic.push(GroupCharacteristicModel.createDocumentCriteria(item.titre, exclude, category))
      })
    }
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
    typeReglementation: 'CTIS' | 'OTHER'
  ): Group {

    const characteristic: GroupCharacteristic[] = []

    this.addGender(characteristic, genders)
    this.addAgeRanges(characteristic, ageRanges)
    this.addGroupCategory(characteristic, researchStudyGroupCategory)
    this.addStudyPopulation(characteristic, studyPopulation, typeReglementation)
    this.addCriteria(characteristic, eligibilityCriteria, 'INCLUSION', 'eligibility-criteria')
    this.addCriteria(characteristic, judgementCriteria, 'PRINCIPAL', 'judgement-criteria')

    return new GroupModel(
      true,
      characteristic.length ? characteristic : undefined,
      enrollmentGroupId,
      ModelUtils.isNotNull(studySize) ? studySize : undefined,
      'person',
      text
    )
  }
}
