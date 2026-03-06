import { Group } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { TranslatedContentModel } from '../../../shared/models/eclaire/TranslatedContentModel'
import { GroupRepository } from '../application/contracts/GroupRepository'

export class EsGroupRepository implements GroupRepository {
  constructor(
    private readonly databaseService: ElasticsearchService
  ) { }

  async find(id: string): Promise<Group> {
    // Get the id of document
    const docId = id.replace(/-enrollment-group$/, '')
    const document: ResearchStudyModel = await this.databaseService.findOneDocument(docId) as ResearchStudyModel
    const group = await this.databaseService.findReferenceContent(id, 'enrollmentGroup') as Group
    const translatedGroup: Group = this.applyTranslationsToResearchStudyModel(document, group)

    return translatedGroup
  }

  private applyTranslationsToResearchStudyModel(
    document: ResearchStudyModel,
    group: Group
  ): Group {

    const translatedContent: TranslatedContentModel | undefined =
      document?.translatedContent

    if (
      !translatedContent ||
      (
        (!translatedContent.judgmentCriteria?.length) &&
        (!translatedContent.eligibilityCriteria?.length)
      )
    ) {
      return group
    }

    let judgmentIndex = 0
    let eligibilityIndex = 0

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const updatedCharacteristics = group.characteristic?.map((char:any) => {
      const codeValue = char.code?.coding?.[0]?.code
      const description = char.description

      // JUDGMENT CRITERIA
      if (
        codeValue === 'grp-other' &&
        description === 'judgement-criteria' &&
        translatedContent.judgmentCriteria?.length
      ) {
        const translatedText =
          translatedContent.judgmentCriteria[judgmentIndex]

        if (translatedText && char.valueCodeableConcept?.coding?.length) {
          char.valueCodeableConcept.coding[0].display = translatedText
          judgmentIndex++
        }
      }

      // ELIGIBILITY CRITERIA
      if (
        codeValue === 'grp-other' &&
        description === 'eligibility-criteria' &&
        translatedContent.eligibilityCriteria?.length
      ) {
        const translatedText =
          translatedContent.eligibilityCriteria[eligibilityIndex]

        if (translatedText && char.valueCodeableConcept?.coding?.length) {
          char.valueCodeableConcept.coding[0].display = translatedText
          eligibilityIndex++
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return char
    })

    return {
      ...group,
      characteristic: updatedCharacteristics,
    }
  }
}
