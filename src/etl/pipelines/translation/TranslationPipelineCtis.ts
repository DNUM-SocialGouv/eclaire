import { Coding, ResearchStudy } from 'fhir/r4'

import { AbstractPipeline } from './AbstractPipeline'
import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../../shared/models/eclaire/ModelUtils'
import { TranslatedContentModel } from '../../../shared/models/eclaire/TranslatedContentModel'
import { TranslationService, TextsToTranslate, TranslatedTextsCtis } from '../../../shared/translation/TranslationService'

export class TranslationPipelineCtis extends AbstractPipeline<ResearchStudyModel> {
  constructor(
    databaseService: ElasticsearchService,
    private readonly translationService: TranslationService,
    logger?: LoggerService
  ) {
    super(databaseService, logger)
  }

  protected buildRequestBody(date?: string) {
    const effectiveDate = date ?? ModelUtils.getDateOfYesterdayInIsoFormatAndWithoutTime()
    const queryParams: FhirParsedQueryParams[] = [
      { name: '_count', value: String(process.env['CHUNK_SIZE']) },
      { name: '_lastUpdated', value: `ge${effectiveDate}` },
      { name: '_must', value: 'REG536' },
      { name: '_sort', value: 'meta.lastUpdated,_id' },
    ]
    return convertFhirParsedQueryParamsToElasticsearchQuery(queryParams)
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

  private extractTextsToTranslate(study: ResearchStudy): TextsToTranslate {
    return {
      diseaseCondition: this.extractDiseaseCondition(study),
      eligibilityCriteria: this.extractCriteriaByType(study, 'eligibility-criteria'),
      judgmentCriteria: this.extractCriteriaByType(study, 'judgement-criteria'),
      therapeuticArea: this.extractTherapeuticArea(study),
      title: study.title ?? '',
    }
  }

  private extractTherapeuticArea(study: ResearchStudy): string {
    const ext = study.extension?.find((e) => e.url.includes('eclaire-therapeutic-area'))
    return ext?.valueString ?? ''
  }

  private extractDiseaseCondition(study: ResearchStudy): string {
    const cond = study.condition?.find((c) => c.coding === undefined)
    return cond?.text ?? ''
  }

  private extractCriteriaByType(study: ResearchStudy, type: 'judgement-criteria' | 'eligibility-criteria'): string[] {
    const researchStudy: any = study
    const characteristics = researchStudy.referenceContents?.enrollmentGroup?.characteristic ?? []
    const results: string[] = []

    for (const char of characteristics) {
      const code = char.code?.coding?.[0]?.code ?? ''
      const desc = char.description ?? ''
      const codings = char.valueCodeableConcept?.coding

      if (code === 'grp-other' && desc === type) {
        const displays: string[] = Array.isArray(codings)
          ? codings.map((c: Coding) => c.display ?? '')
          : []
        results.push(...displays)
      }
    }
    return results
  }
}
