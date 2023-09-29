import { Injectable } from '@nestjs/common'
import { Organization } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { OrganizationRepository } from '../application/contracts/OrganizationRepository'

@Injectable()
export class EsOrganizationRepository implements OrganizationRepository {

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  async find(id: string): Promise<Organization[]> {
    return await this.elasticsearchService.findReferenceContent(
      id,
      'organizations'
    ) as Organization[]
  }
}
