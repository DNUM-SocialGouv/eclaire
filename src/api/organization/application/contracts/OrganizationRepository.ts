import { Organization } from 'fhir/r4'

export interface OrganizationRepository {
  find(id: string): Promise<Organization[]>
}
