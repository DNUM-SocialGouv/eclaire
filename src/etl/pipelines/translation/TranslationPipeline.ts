import { CodeableConcept, Extension, ResearchStudy } from 'fhir/r4'

import { AbstractPipeline } from './AbstractPipeline'
import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../../shared/models/eclaire/ModelUtils'
import { TranslatedContentModel } from '../../../shared/models/eclaire/TranslatedContentModel'
import { TranslationService, TextsToTranslate, TranslatedTexts } from '../../../shared/translation/TranslationService'

export class TranslationPipeline extends AbstractPipeline<ResearchStudyModel> {
  constructor(
    databaseService: ElasticsearchService,
    private readonly translationService: TranslationService,
    logger?: LoggerService
  ) {
    super(databaseService, logger)
  }

  protected buildRequestBody(date?: string): ElasticsearchBodyType {
    if (date) return this.buildBodyToFindAllStudiesExcludingCtisSinceAGivenDate(date)
    return this.buildBodyToFindAllStudiesExcludingCtisSinceYesterday()
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
    // 1. Build object with keys diseaseCondition-1, therapeuticArea-1, title-1, etc.
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

    // 2. Translate by chunks (limit 99 so translate 33 documents by request)
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

    // 3. Inject translated data back into researchStudies
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

    // 4. Return updated studies
    return researchStudies
  }

  private buildBodyToFindAllStudiesExcludingCtisSinceAGivenDate(date: string): ElasticsearchBodyType {
    const ctisStudiesQueryParams: FhirParsedQueryParams[] = [
      { name: '_count', value: String(process.env['CHUNK_SIZE']) },
      { name: '_lastUpdated', value: `ge${date}` },
      { name: '_mustNot', value: 'REG536' },
      { name: '_sort', value: 'meta.lastUpdated,_id' },
    ]

    return convertFhirParsedQueryParamsToElasticsearchQuery(ctisStudiesQueryParams)
  }

  private buildBodyToFindAllStudiesExcludingCtisSinceYesterday(): ElasticsearchBodyType {
    const yesterday = ModelUtils.getDateOfYesterdayInIsoFormatAndWithoutTime()
    return this.buildBodyToFindAllStudiesExcludingCtisSinceAGivenDate(yesterday)
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
