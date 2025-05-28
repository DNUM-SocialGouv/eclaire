import { FhirParsedQueryParams } from '../../../api/research-study/controllers/FhirQueryParams'
import { convertFhirParsedQueryParamsToElasticsearchQuery } from '../../../api/research-study/gateways/converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'
import { CodeableConceptModel } from '../../../shared/models/data-types/CodeableConceptModel'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ModelUtils } from '../../../shared/models/eclaire/ModelUtils'
import { MedDra } from '../../dto/EclaireDto'

export class MedDraPipeline {
  constructor(
    private readonly databaseService: ElasticsearchService
  ) {}

  async execute(date?: string): Promise<void> {
    const data: ResearchStudyModel[] = await this.extract(date)

    if (data.length > 0) {
      const chunkSize = Number.parseInt(process.env['CHUNK_SIZE'])
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize)
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

    const response: SearchResponse = await this.databaseService.search(
      requestBodyToFindEveryCtisStudiesSinceASpecificDate,
      true
    )

    return response.hits.map((value: SearchResponseHits) => (value._source as unknown as ResearchStudyModel))
  }

  async transform(researchStudies: ResearchStudyModel[]): Promise<ResearchStudyModel[]> {
    for (const researchStudy of researchStudies) {
      if (researchStudy.originalContentsToEnhance?.meddraCodes && researchStudy.originalContentsToEnhance.meddraCodes.length > 0) {
        const meddraDocuments: MedDra[] = await this.databaseService.findMedDraDocuments(
          researchStudy.originalContentsToEnhance.meddraCodes
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
      { name: '_count', value: '5000' },
      { name: '_lastUpdated', value: `ge${date}` },
      { name: '_text', value: 'REG536' },
    ]

    return convertFhirParsedQueryParamsToElasticsearchQuery(ctisStudiesQueryParams)
  }

  private buildBodyToFindEveryCtisStudiesSinceYesterday(): ElasticsearchBodyType {
    const formattedYesterdayDate: string = ModelUtils.getDateOfYesterdayInIsoFormatAndWithoutTime()
    return this.buildBodyToFindEveryCtisStudiesSinceAGivenDate(formattedYesterdayDate)
  }
}
