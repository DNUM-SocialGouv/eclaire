import { SearchBodyType } from '../entities/SearchBody'
import { SearchResponse } from '../entities/SearchResponse'

export interface ResearchStudyRepository {
  findOne(id: string): Promise<unknown>
  search(bodySearch: SearchBodyType): Promise<SearchResponse>
}
