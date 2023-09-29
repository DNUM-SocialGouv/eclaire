import { Injectable } from '@nestjs/common'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { OrganizationRepository } from '../application/contracts/OrganizationRepository'

@Injectable()
export class EsOrganizationRepository implements OrganizationRepository {

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  async findOne(id: string): Promise<unknown> {
    return await this.elasticsearchService.findOneDocument(id)
  }
}
