import { CodeableConcept, Extension, ResearchStudy } from 'fhir/r4'

import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'

export class TranslationPipeline {
  constructor(
    private readonly databaseService: ElasticsearchService
  ) {}

  async execute(): Promise<void> {
    const data: ResearchStudy[] = await this.extract()
    const transformedResearchStudies: ResearchStudy[] = this.transform(data)
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

  transform(researchStudies: ResearchStudy[]): ResearchStudy[] {
    researchStudies.forEach((researchStudy: ResearchStudy) => {
      researchStudy.title = 'blah-blah-blah-traduction'

      researchStudy.extension.find((value: Extension) => {
        return value.url.includes('eclaire-therapeutic-area')
      }).valueString = 'traduction du domaine thérapeutique'

      researchStudy.condition.find((value: CodeableConcept) => {
        return value.text === 'diseaseCondition'
      }).coding[0].display = 'traduction de la pathologie maladie rare'
    })
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
