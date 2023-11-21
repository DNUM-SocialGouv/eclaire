import { CodeableConcept, Extension, ResearchStudy } from 'fhir/r4'

import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'
import { TranslationService, TextsToTranslate, TranslatedTexts } from '../../../shared/translation/TranslationService'

export class TranslationPipeline {
  constructor(
    private readonly databaseService: ElasticsearchService,
    private readonly translationService: TranslationService
  ) {}

  async execute(date?: string): Promise<void> {
    const data: ResearchStudy[] = await this.extract(date)

    if (data.length > 0) {
      const transformedResearchStudies: ResearchStudy[] = await this.transform(data)
      await this.load(transformedResearchStudies)
    }
  }

  async extract(date?: string): Promise<ResearchStudy[]> {
    let requestBodyToFindEveryCtisStudiesSinceASpecificDate: ElasticsearchBodyType

    if (date) {
      requestBodyToFindEveryCtisStudiesSinceASpecificDate = this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(date)
    } else {
      requestBodyToFindEveryCtisStudiesSinceASpecificDate = this.buildBodyToFindEveryCtisStudiesSinceYesterday()
    }

    const response: SearchResponse = await this.databaseService.search(
      requestBodyToFindEveryCtisStudiesSinceASpecificDate,
      true
    )

    return response.hits.map((value: SearchResponseHits) => (value._source as unknown as ResearchStudy))
  }

  async transform(researchStudies: ResearchStudy[]): Promise<ResearchStudy[]> {
    for (const researchStudy of researchStudies) {
      const {
        textsToTranslate,
        extensionReference,
        codeableConceptReference,
      } = this.extractTextsToTranslateAndReferencesToUpdate(researchStudy)

      const translatedTexts: TranslatedTexts = await this.translationService.execute(textsToTranslate)

      this.addTranslationsToReferences(researchStudy, translatedTexts, extensionReference, codeableConceptReference)
    }
    return researchStudies
  }

  async load(researchStudies: ResearchStudy[]): Promise<void> {
    await this.databaseService.bulkDocuments(researchStudies)
  }

  private buildBodyToFindEveryCtisStudiesSinceAGivenDate(date: string): ElasticsearchBodyType {
    const everyCtisStudiesSinceYesterdayQueryParams: FhirParsedQueryParams[] = [
      { name: '_count', value: '1000' },
      { name: '_lastUpdated', value: `ge${date}` },
      { name: '_text', value: 'REG536' },
    ]

    return convertFhirParsedQueryParamsToElasticsearchQuery(everyCtisStudiesSinceYesterdayQueryParams)
  }

  private buildBodyToFindEveryCtisStudiesSinceYesterday(): ElasticsearchBodyType {
    const date: Date = new Date()
    const yesterdayDate = date.getDate() - 1
    date.setDate(yesterdayDate)
    const formattedYesterdayDate = date.toISOString().split('T')[0]

    return this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(formattedYesterdayDate)
  }

  private extractTextsToTranslateAndReferencesToUpdate(researchStudy: ResearchStudy) {
    const textsToTranslate: TextsToTranslate = {
      diseaseCondition: '',
      therapeuticArea: '',
      title: '',
    }

    let extensionReference: Extension
    let codeableConceptReference: CodeableConcept

    if (researchStudy.title) {
      textsToTranslate.title = researchStudy.title
    }

    if (researchStudy.extension) {
      extensionReference = researchStudy.extension.find((value: Extension) => value.url.includes('eclaire-therapeutic-area'))
      if (extensionReference) {
        textsToTranslate.therapeuticArea = extensionReference.valueString
      }
    }

    if (researchStudy.condition) {
      codeableConceptReference = researchStudy.condition.find((value: CodeableConcept) => value.text === 'diseaseCondition')
      if (codeableConceptReference) {
        textsToTranslate.diseaseCondition = codeableConceptReference.coding[0].display
      }
    }
    return {
      codeableConceptReference,
      extensionReference,
      textsToTranslate,
    }
  }

  private addTranslationsToReferences(
    researchStudy: ResearchStudy,
    translatedTexts: TranslatedTexts,
    extension: Extension,
    codeableConcept: CodeableConcept
  ) {
    if (researchStudy.title) {
      researchStudy.title = translatedTexts.title
    }

    if (extension) {
      extension.valueString = translatedTexts.therapeuticArea
    }

    if (codeableConcept) {
      codeableConcept.coding[0].display = translatedTexts.diseaseCondition
    }
  }
}
