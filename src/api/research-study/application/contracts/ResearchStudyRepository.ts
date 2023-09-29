import { Bundle } from 'fhir/r4'

import { ElasticsearchBodyType } from '../../../../shared/elasticsearch/ElasticsearchBody'
import { ResearchStudyQueryParams } from '../../controllers/converter/ResearchStudyQueryParams'

export interface ResearchStudyRepository {
  findOne(id: string): Promise<unknown>
  search(elasticsearchBody: ElasticsearchBodyType, queryParams: ResearchStudyQueryParams[]): Promise<Bundle>
}
