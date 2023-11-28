import { Bundle } from 'fhir/r4'

import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { FhirParsedQueryParams } from '../controllers/FhirQueryParams'

export interface ResearchStudyRepository {
  findOne(id: string): Promise<ResearchStudyModel>
  search(researchStudyQueryModel: FhirParsedQueryParams[]): Promise<Bundle>
}
