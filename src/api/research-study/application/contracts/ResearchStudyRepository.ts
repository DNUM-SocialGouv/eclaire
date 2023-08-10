import { Bundle } from 'fhir/r4'

import { ResearchStudyQueryParams } from '../../controllers/converter/ResearchStudyQueryParams'
import { ElasticsearchBodyType } from '../entities/ElasticsearchBody'

export interface ResearchStudyRepository {
  findOne(id: string): Promise<unknown>
  search(elasticsearchBody: ElasticsearchBodyType, queryParams: ResearchStudyQueryParams[]): Promise<Bundle>
}
