import { AbstractPipeline } from './AbstractPipeline'
import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'
import { CodeableConceptModel } from '../../../shared/models/data-types/CodeableConceptModel'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../../shared/models/eclaire/ModelUtils'
import { MedDra } from '../../dto/EclaireDto'

export class MedDraPipeline extends AbstractPipeline<ResearchStudyModel> {
  constructor(
    databaseService: ElasticsearchService,
    logger?: LoggerService
  ) {
    super(databaseService, logger)
  }

  protected buildRequestBody(date?: string): ElasticsearchBodyType {
    if (date) return this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(date)
    return this.buildBodyToFindEveryCtisStudiesSinceYesterday()
  }

  protected async transform(researchStudies: ResearchStudyModel[]): Promise<ResearchStudyModel[]> {
    for (const researchStudy of researchStudies) {
      if (researchStudy.originalContentsToEnhance?.meddraCodes && researchStudy.originalContentsToEnhance.meddraCodes.length > 0) {
        const meddraDocuments: MedDra[] = await this.databaseService.findMedDraDocuments(
          researchStudy.originalContentsToEnhance.meddraCodes.filter((code: string) => code !== '')
        ) as MedDra[]

        if (ModelUtils.isNotNull(meddraDocuments)) {
          // Remove existing meddra-condition entries to avoid duplication
          const newConditions = researchStudy.condition.filter((c) => !c.id?.startsWith('meddra-condition-'))
          researchStudy.condition.length = 0 // clear the array
          researchStudy.condition.push(...newConditions) // restore filtered items

          // Push new MedDRA entries
          researchStudy.condition.push(
            ...CodeableConceptModel.createMedDraSlice(researchStudy.id, meddraDocuments)
          )
        }
      }
    }

    return researchStudies
  }

  private buildBodyToFindEveryCtisStudiesSinceAGivenDate(date: string): ElasticsearchBodyType {
    // Get Only CTIS documents
    const queryParams: FhirParsedQueryParams[] = [
      { name: '_count', value: String(process.env['CHUNK_SIZE']) },
      { name: '_lastUpdated', value: `ge${date}` },
      { name: '_must', value: 'REG536' },
      { name: '_sort', value: 'meta.lastUpdated,_id' },
    ]

    return convertFhirParsedQueryParamsToElasticsearchQuery(queryParams)
  }

  private buildBodyToFindEveryCtisStudiesSinceYesterday(): ElasticsearchBodyType {
    const formattedYesterdayDate: string = ModelUtils.getDateOfYesterdayInIsoFormatAndWithoutTime()
    return this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(formattedYesterdayDate)
  }
}
