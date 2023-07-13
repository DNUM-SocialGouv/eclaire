import { Bundle } from 'fhir/r4'

import { SearchBodyType } from '../entities/SearchBody'

export interface ResearchStudyRepository {
  findOne(id: string): Promise<unknown>
  search(bodySearch: SearchBodyType): Promise<Bundle>
}
