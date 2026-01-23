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
    let from = parseInt(process.argv[4]) ? parseInt(process.argv[4]) : 0
    let allResults:ResearchStudyModel[] = []
    // eslint-disable-next-line no-constant-condition
    while (true) {
      this.logger?.info(`---- Translate: from value: ${from}`)
      requestBodyToFindEveryCtisStudiesSinceASpecificDate.from = from
      const response: SearchResponse = await this.databaseService.search(
        requestBodyToFindEveryCtisStudiesSinceASpecificDate,
        true
      )

      this.logger?.info(`---- Translate: Received ${response.hits.length} hits`)
      if (!response.hits || response.hits.length === 0) break

      const res = response.hits.map((value: SearchResponseHits) => (value._source as unknown as ResearchStudyModel))
      const transformedResearchStudies: ResearchStudyModel[] = await this.transform(res)
      await this.load(transformedResearchStudies)
      allResults = res
      from += chunkSize
    }
    this.logger?.info('---- Get all CTIS/DM-DIV/JARDE finish')
    return allResults
  }

  valuesToArray(obj: any): string[] {
    // Extraire tous les indices présents dans les clés
    const indices = new Set<number>()
    Object.keys(obj).forEach((key) => {
      const match = key.match(/-(\d+)$/)
      if (match) indices.add(Number(match[1]))
    })

    // Trier les indices pour garder l'ordre naturel
    const sortedIndices = Array.from(indices).sort((a, b) => a - b)

    // Récupérer toutes les valeurs en respectant l'ordre
    const result: string[] = []
    sortedIndices.forEach((i) => {
      Object.keys(obj)
        .filter((k) => k.endsWith(`-${i}`))
        .sort() // optionnel : garantit l’ordre des champs
        .forEach((k) => {
          result.push(obj[k])
        })
    })

    return result
  }

  async transform(researchStudies: ResearchStudyModel[]): Promise<ResearchStudyModel[]> {
    let returnedTarget = {}
    let i = 1
    // 1️⃣ Build object with keys diseaseCondition-1, therapeuticArea-1, title-1, etc.
    for (const researchStudy of researchStudies) {
      const textsToTranslate: TextsToTranslate = this.extractTextsToTranslate(researchStudy)
      const textsToTranslateinit = {
        [`diseaseCondition-${i}`]: textsToTranslate.diseaseCondition,
        [`therapeuticArea-${i}`]: textsToTranslate.therapeuticArea,
        [`title-${i}`]: textsToTranslate.title,
      }
      returnedTarget = Object.assign(returnedTarget, textsToTranslateinit)
      i++
    }

    // 2️⃣ Translate by chunks (limit 99 so translate 33 documents by request)
    let allTranslated: Record<string, string> = {}
    const chunkSize = 99
    for (let j = 0; j < Object.keys(returnedTarget).length; j += chunkSize) {
      this.logger?.info(`---- Chunk translate: ${j} / ${Object.keys(returnedTarget).length} opensearch documents`)
      const chunk = Object.fromEntries(Object.entries(returnedTarget).slice(j, j + chunkSize))
      const arrayResult: string[] = this.valuesToArray(chunk)
      const step = j === 0 ? 0 : j / 3
      const translatedTexts: TranslatedTexts = await this.translationService.execute(arrayResult, step)
      // Merge translated results into global dictionary
      allTranslated = { ...allTranslated, ...translatedTexts }
    }

    // 3️⃣ Inject translated data back into researchStudies
    for (let k = 0; k < researchStudies.length; k++) {
      const index = k + 1
      const diseaseCondition = allTranslated[`diseaseCondition-${index}`] ?? ''
      const therapeuticArea = allTranslated[`therapeuticArea-${index}`] ?? ''
      const title = allTranslated[`title-${index}`] ?? ''

      const translatedContent = TranslatedContentModel.create(
        diseaseCondition,
        therapeuticArea,
        title
      )

      researchStudies[k].translatedContent = translatedContent
    }

    // 4️⃣ Return updated studies
    return researchStudies
  }

  async load(researchStudies: ResearchStudyModel[]): Promise<void> {
    await this.databaseService.bulkDocuments(researchStudies)
  }

  private buildBodyToFindEveryCtisStudiesSinceAGivenDate(date: string): ElasticsearchBodyType {
    const ctisStudiesQueryParams: FhirParsedQueryParams[] = [
      { name: '_count', value: String(process.env['CHUNK_SIZE']) },
      { name: '_lastUpdated', value: `ge${date}` },
      { name: '_sort', value: 'meta.lastUpdated,_id' },
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
