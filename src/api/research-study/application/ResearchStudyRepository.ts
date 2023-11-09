import { Bundle, ResearchStudy } from 'fhir/r4'

import { FhirParsedQueryParams } from '../controllers/FhirQueryParams'

export interface ResearchStudyRepository {
  findOne(id: string): Promise<ResearchStudy>
  search(researchStudyQueryModel: FhirParsedQueryParams[]): Promise<Bundle>
}
