import { CodeableConcept, Extension, ResearchStudy } from 'fhir/r4'

import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../../shared/models/eclaire/ModelUtils'
import { TranslatedContentModel } from '../../../shared/models/eclaire/TranslatedContentModel'
import { TranslationService, TextsToTranslate, TranslatedTexts } from '../../../shared/translation/TranslationService'

export class TranslationPipeline {
  constructor(
    private readonly databaseService: ElasticsearchService,
    private readonly translationService: TranslationService,
    protected readonly logger?: LoggerService
  ) { }

  async execute(date?: string): Promise<void> {
    const data: ResearchStudyModel[] = await this.extract(date)
    this.logger?.info(`---- Chunk Translation data length: ${data.length}`)
    if (data.length > 0) {
      //const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
      const chunkSize = 20
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize)
        this.logger?.info(`---- Chunk Translation: ${i} / ${data.length} elasticsearch documents`)
        const transformedResearchStudies: ResearchStudyModel[] = await this.transform(chunk)
        await this.load(transformedResearchStudies)
      }
    }
  }

  async extract(startingDate?: string): Promise<ResearchStudyModel[]> {
    let requestBodyToFindEveryCtisStudiesSinceASpecificDate: ElasticsearchBodyType

    if (startingDate) {
      requestBodyToFindEveryCtisStudiesSinceASpecificDate = this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(startingDate)
    } else {
      requestBodyToFindEveryCtisStudiesSinceASpecificDate = this.buildBodyToFindEveryCtisStudiesSinceYesterday()
    }

    this.logger?.info('---- Extract data to filter ///')
    console.log("log filter //", JSON.stringify(requestBodyToFindEveryCtisStudiesSinceASpecificDate))
    const response: SearchResponse = await this.databaseService.search(
      requestBodyToFindEveryCtisStudiesSinceASpecificDate,
      true
    )
    this.logger?.info('---- Get all CTIS finish')

    return response.hits.map((value: SearchResponseHits) => (value._source as unknown as ResearchStudyModel))
  }

  async transform(researchStudies: ResearchStudyModel[]): Promise<ResearchStudyModel[]> {
    for (const researchStudy of researchStudies) {
      const textsToTranslate: TextsToTranslate = this.extractTextsToTranslate(researchStudy)

      const translatedTexts: TranslatedTexts = await this.translationService.execute(textsToTranslate)

      researchStudy.translatedContent = TranslatedContentModel.create(
        translatedTexts.diseaseCondition,
        translatedTexts.therapeuticArea,
        translatedTexts.title
      )
    }

    return researchStudies
  }

  async load(researchStudies: ResearchStudyModel[]): Promise<void> {
    await this.databaseService.bulkDocuments(researchStudies)
  }

  private buildBodyToFindEveryCtisStudiesSinceAGivenDate(date: string): ElasticsearchBodyType {
    const ctisStudiesQueryParams: FhirParsedQueryParams[] = [
      { name: '_lastUpdated', value: `ge${date}` },
      { name: '_text', value: 'REG536' },
    ]

    return convertFhirParsedQueryParamsToElasticsearchQuery(ctisStudiesQueryParams)
  }

  private buildBodyToFindEveryCtisStudiesSinceYesterday(): ElasticsearchBodyType {
    const formattedYesterdayDate = ModelUtils.getDateOfYesterdayInIsoFormatAndWithoutTime()
    return this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(formattedYesterdayDate)
  }

  private extractTextsToTranslate(researchStudy: ResearchStudy): TextsToTranslate {
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
      codeableConceptReference = researchStudy.condition.find((value: CodeableConcept) => this.isDiseaseCondition(value))
      if (codeableConceptReference) {
        textsToTranslate.diseaseCondition = codeableConceptReference.text
      }
    }
    return textsToTranslate
  }

  private isDiseaseCondition(value: CodeableConcept) {
    return value.coding === undefined
  }
}
