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
    await this.extract(date)    
  }

  async extract(startingDate?: string) {
    let requestBodyToFindEveryCtisStudiesSinceASpecificDate: ElasticsearchBodyType

    if (startingDate) {
      requestBodyToFindEveryCtisStudiesSinceASpecificDate = this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(startingDate)
    } else {
      requestBodyToFindEveryCtisStudiesSinceASpecificDate = this.buildBodyToFindEveryCtisStudiesSinceYesterday()
    }

    this.logger?.info('---- Extract data to filter ///')
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
    let from = 0

    // eslint-disable-next-line no-constant-condition
    while (true) {
      this.logger?.info(`---- from value: ${from}`)
      requestBodyToFindEveryCtisStudiesSinceASpecificDate.from = from
      const response: SearchResponse = await this.databaseService.search(
        requestBodyToFindEveryCtisStudiesSinceASpecificDate,
        true
      )

      this.logger?.info(`---- Received ${response.hits.length} hits`);
      if (!response.hits || response.hits.length === 0) break

      const res = response.hits.map((value: SearchResponseHits) => (value._source as unknown as ResearchStudyModel))
      const transformedResearchStudies: ResearchStudyModel[] = await this.transform(res)
      await this.load(transformedResearchStudies)
      
      from += chunkSize
    }
    this.logger?.info('---- Get all CTIS/DM-DIV/JARDE finish')
  }

  private delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
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
      await this.delay(500); // 500ms entre chaque requête
    }

    return researchStudies
  }

  async load(researchStudies: ResearchStudyModel[]): Promise<void> {
    await this.databaseService.bulkDocuments(researchStudies)
  }

  private buildBodyToFindEveryCtisStudiesSinceAGivenDate(date: string): ElasticsearchBodyType {
    const ctisStudiesQueryParams: FhirParsedQueryParams[] = [
      { name: '_count', value: String(process.env['CHUNK_SIZE']) },
      { name: '_lastUpdated', value: `ge${date}` },
      { name: '_sort', value: `meta.lastUpdated,_id` },
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
