import { CodeableConcept, Extension, ResearchStudy } from 'fhir/r4'

import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'
import { DeeplService, TextsToTranslate, TranslatedTexts } from '../../../shared/translation/DeeplService'

export class TranslationPipeline {
  constructor(
    private readonly databaseService: ElasticsearchService,
    private readonly translationService: DeeplService
  ) {}

  async execute(): Promise<void> {
    const data: ResearchStudy[] = await this.extract()
    const transformedResearchStudies: ResearchStudy[] = await this.transform(data)
    await this.load(transformedResearchStudies)
  }

  async extract(): Promise<ResearchStudy[]> {
    const requestBodyToFindEveryCtisStudiesSinceYesterday: ElasticsearchBodyType = this.buildBodyToFindEveryCtisStudiesSinceYesterday()

    const response: SearchResponse = await this.databaseService.search(
      requestBodyToFindEveryCtisStudiesSinceYesterday,
      true
    )

    return response.hits.map((value: SearchResponseHits) => (value._source as unknown as ResearchStudy))
  }

  async transform(researchStudies: ResearchStudy[]): Promise<ResearchStudy[]> {
    const textsToTranslate: TextsToTranslate = {
      diseaseCondition: '',
      therapeuticArea: '',
      title: '',
    }

    for (const researchStudy of researchStudies) {
      let extension: Extension
      let codeableConcept: CodeableConcept

      if (researchStudy.title) {
        textsToTranslate.title = researchStudy.title
      }

      if (researchStudy.extension) {
        extension = researchStudy.extension.find((value: Extension) => value.url.includes('eclaire-therapeutic-area'))
        if (extension) {
          textsToTranslate.therapeuticArea = extension.valueString
        }
      }

      if (researchStudy.condition) {
        codeableConcept = researchStudy.condition.find((value: CodeableConcept) => value.text === 'diseaseCondition')
        if (codeableConcept) {
          textsToTranslate.diseaseCondition = codeableConcept.coding[0].display
        }
      }

      const translatedTexts: TranslatedTexts = await this.translationService.execute(textsToTranslate)

      if (researchStudy.title) researchStudy.title = translatedTexts.title
      if (extension) extension.valueString = translatedTexts.therapeuticArea
      if (codeableConcept) codeableConcept.coding[0].display = translatedTexts.diseaseCondition
    }
    return researchStudies
  }

  async load(researchStudies: ResearchStudy[]): Promise<void> {
    await this.databaseService.bulkDocuments(researchStudies)
  }

  private buildBodyToFindEveryCtisStudiesSinceYesterday(): ElasticsearchBodyType {
    const formattedYesterdayDate = this.getFormattedYesterdayDate()

    const everyCtisStudiesSinceYesterdayQueryParams: FhirParsedQueryParams[] = [
      { name: '_count', value: '1000' },
      { name: '_lastUpdated', value: `gt${formattedYesterdayDate}` },
      { name: '_text', value: 'REG536' },
    ]

    return convertFhirParsedQueryParamsToElasticsearchQuery(everyCtisStudiesSinceYesterdayQueryParams)
  }

  private getFormattedYesterdayDate(): string {
    const date: Date = new Date()
    const yesterdayDate = date.getDate() - 1
    date.setDate(yesterdayDate)
    return date.toISOString().split('T')[0]
  }
}
