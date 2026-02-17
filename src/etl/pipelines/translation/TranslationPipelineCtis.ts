import { CodeableConcept, Coding, Extension, ResearchStudy } from 'fhir/r4'

import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../../shared/models/eclaire/ModelUtils'
import { TranslatedContentModel } from '../../../shared/models/eclaire/TranslatedContentModel'
import { TranslationService, TextsToTranslate, TranslatedTextsCtis } from '../../../shared/translation/TranslationService'

export class TranslationPipelineCtis {
  constructor(
    private readonly databaseService: ElasticsearchService,
    private readonly translationService: TranslationService,
    protected readonly logger?: LoggerService
  ) { }

  async execute(date?: string): Promise<void> {
    await this.extract(date)
  }

  async extract(startingDate?: string) {
    let requestBody: ElasticsearchBodyType

    if (startingDate) {
      requestBody = this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(startingDate)
    } else {
      requestBody = this.buildBodyToFindEveryCtisStudiesSinceYesterday()
    }

    this.logger?.info('---- Extract data to translate CTIS studies ///')
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'] ?? '100')
    let from = 0
    let searchAfter: any[] | undefined = undefined
    let allResults: ResearchStudyModel[] = []

    requestBody.size = chunkSize
    // eslint-disable-next-line no-constant-condition
    while (true) {
      this.logger?.info(`---- Translate batch using search_after for CTIS: from value: ${from}`)
      // Inject search_after only if it is not the first query
      if (searchAfter) {
        requestBody.search_after = searchAfter
      } else {
        delete requestBody.search_after
      }

      const response: SearchResponse = await this.databaseService.search(
        requestBody,
        true
      )

      this.logger?.info(`---- Translate CTIS: Received ${response.hits.length} hits`)
      if (!response.hits || response.hits.length === 0) break

      const res = response.hits.map((value: SearchResponseHits) => (value._source as unknown as ResearchStudyModel))
      const transformedResearchStudies: ResearchStudyModel[] = await this.transform(res)
      await this.load(transformedResearchStudies)
      // retrieve the fate of the last document
      const lastHit = response.hits[response.hits.length - 1]
      searchAfter = lastHit.sort

      allResults = res
      from += chunkSize
    }
    this.logger?.info('---- Translation pipeline CTIS finished')
    return allResults
  }

  async transform(researchStudies: ResearchStudyModel[]): Promise<ResearchStudyModel[]> {
    for (const researchStudy of researchStudies) {
      const textsToTranslate: TextsToTranslate = this.extractTextsToTranslate(researchStudy)

      const translatedTexts: TranslatedTextsCtis = await this.translationService.executeCtis(textsToTranslate)

      researchStudy.translatedContent = TranslatedContentModel.create(
        translatedTexts.diseaseCondition,
        translatedTexts.therapeuticArea,
        translatedTexts.title,
        translatedTexts.judgmentCriteria,
        translatedTexts.eligibilityCriteria
      )
    }

    return researchStudies
  }

  async load(researchStudies: ResearchStudyModel[]): Promise<void> {
    await this.databaseService.bulkDocuments(researchStudies)
  }

  private buildBodyToFindEveryCtisStudiesSinceAGivenDate(date: string): ElasticsearchBodyType {
    // Get Only CTIS documents
    const ctisStudiesQueryParams: FhirParsedQueryParams[] = [
      { name: '_count', value: String(process.env['CHUNK_SIZE']) },
      { name: '_lastUpdated', value: `ge${date}` },
      { name: '_must', value: 'REG536' },
      { name: '_sort', value: 'meta.lastUpdated,_id' },
    ]

    return convertFhirParsedQueryParamsToElasticsearchQuery(ctisStudiesQueryParams)
  }

  private buildBodyToFindEveryCtisStudiesSinceYesterday(): ElasticsearchBodyType {
    const formattedYesterdayDate = ModelUtils.getDateOfYesterdayInIsoFormatAndWithoutTime()
    return this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(formattedYesterdayDate)
  }

  private extractTextsToTranslate(researchStudy: ResearchStudy): TextsToTranslate {
    /* eslint-disable sort-keys */
    const textsToTranslate: TextsToTranslate = {
      diseaseCondition: '',
      therapeuticArea: '',
      title: '',
      judgmentCriteria: [],
      eligibilityCriteria: [],
    }
    /* eslint-enable sort-keys */

    const referenceContents: any = researchStudy

    const judgmentCriteria: string[] = []
    const eligibilityCriteria: string[] = []
    // Verify that enrollmentGroup and characteristic exist
    const characteristics = referenceContents.referenceContents?.enrollmentGroup?.characteristic ?? []

    for (const char of characteristics) {
      const codeValue: string = char.code?.coding?.[0]?.code ?? ''
      const description: string = char.description ?? ''

      const coding = char.valueCodeableConcept?.coding

      if (codeValue === 'grp-other' && description === 'judgement-criteria') {
        // Push toutes les valeurs display dans judgmentCriteria
        const displays: string[] = Array.isArray(coding)
          ? coding.map((c: Coding) => c.display ?? '')
          : []
        judgmentCriteria.push(...displays)
      }

      if (codeValue === 'grp-other' && description === 'eligibility-criteria') {
        // Push toutes les valeurs display dans eligibilityCriteria
        const displays: string[] = Array.isArray(coding)
          ? coding.map((c: Coding) => c.display ?? '')
          : []
        eligibilityCriteria.push(...displays)
      }
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

    // Add criteria for transalte it only for CTIS
    if (judgmentCriteria.length) {
      textsToTranslate.judgmentCriteria = judgmentCriteria
    }
    if (eligibilityCriteria.length) {
      textsToTranslate.eligibilityCriteria = eligibilityCriteria
    }
    return textsToTranslate
  }

  private isDiseaseCondition(value: CodeableConcept) {
    return value.coding === undefined
  }
}
