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
    let requestBody: ElasticsearchBodyType

    if (startingDate) {
      requestBody = this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(startingDate)
    } else {
      requestBody = this.buildBodyToFindEveryCtisStudiesSinceYesterday()
    }

    this.logger?.info('---- Extract data to filter MedDra ///')
    const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'] ?? '100')
    let from = 0
    let searchAfter: any[] | undefined = undefined
    let allResults: ResearchStudyModel[] = []
    requestBody.size = chunkSize

    // eslint-disable-next-line no-constant-condition
    while (true) {
      this.logger?.info(`---- Medra batch using search_after: from value: ${from}`)
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

      this.logger?.info(`---- Medra data: Received ${response.hits.length} hits`)
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

    this.logger?.info('---- update Medra infos finished')
    return allResults
  }

  async transform(researchStudies: ResearchStudyModel[]): Promise<ResearchStudyModel[]> {
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

  async load(researchStudies: ResearchStudyModel[]): Promise<void> {
    await this.databaseService.bulkDocuments(researchStudies)
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
