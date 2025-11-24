import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../../../shared/logger/LoggerService'
import { CodeableConceptModel } from '../../../shared/models/data-types/CodeableConceptModel'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../../shared/models/eclaire/ModelUtils'
import { MedDra } from '../../dto/EclaireDto'

export class MedDraPipeline {
  constructor(
    private readonly databaseService: ElasticsearchService,
    protected readonly logger?: LoggerService
  ) {}

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

    this.logger?.info('---- Extract data to filter MedDra ///')
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
    let from = 0
    let allResults:ResearchStudyModel[] = []
    // eslint-disable-next-line no-constant-condition
    while (true) {
      this.logger?.info(`---- from value: ${from}`)
      requestBodyToFindEveryCtisStudiesSinceASpecificDate.from = from
      const response: SearchResponse = await this.databaseService.search(
        requestBodyToFindEveryCtisStudiesSinceASpecificDate,
        true
      )

      if (!response.hits || response.hits.length === 0) break

      const res = response.hits.map((value: SearchResponseHits) => (value._source as unknown as ResearchStudyModel))
      const transformedResearchStudies: ResearchStudyModel[] = await this.transform(res)
      await this.load(transformedResearchStudies)
      allResults = res
      from += chunkSize
    }
    this.logger?.info('---- Get all MedDra finish')
    return allResults
  }

  async transform(researchStudies: ResearchStudyModel[]): Promise<ResearchStudyModel[]> {
    for (const researchStudy of researchStudies) {
      if (researchStudy.originalContentsToEnhance?.meddraCodes && researchStudy.originalContentsToEnhance.meddraCodes.length > 0) {
        const meddraDocuments: MedDra[] = await this.databaseService.findMedDraDocuments(
          researchStudy.originalContentsToEnhance.meddraCodes.filter((code: string) => code !== '')
        ) as MedDra[]

        if (ModelUtils.isNotNull(meddraDocuments)) {
          researchStudy.condition.push(...CodeableConceptModel.createMedDraSlice(researchStudy.id, meddraDocuments))
        }
      }
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
      { name: '_text', value: 'REG536' },
      { name: '_sort', value: 'meta.lastUpdated,_id' },
    ]

    return convertFhirParsedQueryParamsToElasticsearchQuery(ctisStudiesQueryParams)
  }

  private buildBodyToFindEveryCtisStudiesSinceYesterday(): ElasticsearchBodyType {
    const formattedYesterdayDate: string = ModelUtils.getDateOfYesterdayInIsoFormatAndWithoutTime()
    return this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(formattedYesterdayDate)
  }
}
