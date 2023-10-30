import { Organization } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { OrganizationRepository } from '../application/contracts/OrganizationRepository'

export class EsOrganizationRepository implements OrganizationRepository {
  constructor(
    private readonly databaseService: ElasticsearchService
  ) {}

  async find(id: string): Promise<Organization[]> {
    return await this.databaseService.findReferenceContent(
      id,
      'organizations'
    ) as Organization[]
  }
}
