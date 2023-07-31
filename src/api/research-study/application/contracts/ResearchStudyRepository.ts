import { Bundle } from 'fhir/r4'

import { ElasticsearchBodyType } from '../entities/ElasticsearchBody'

export interface ResearchStudyRepository {
  findOne(id: string): Promise<unknown>
  search(elasticsearchBody: ElasticsearchBodyType): Promise<Bundle>
}
