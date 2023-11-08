import { Bundle, ResearchStudy } from 'fhir/r4'

import { ResearchStudyQueryParams } from '../../controllers/converter/ResearchStudyQueryParams'

export interface ResearchStudyRepository {
  findOne(id: string): Promise<ResearchStudy>
  search(researchStudyQueryModel: ResearchStudyQueryParams[]): Promise<Bundle>
}
