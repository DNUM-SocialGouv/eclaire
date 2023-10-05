import { Injectable } from '@nestjs/common'
import { Group } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { GroupRepository } from '../application/contracts/GroupRepository'

@Injectable()
export class EsGroupRepository implements GroupRepository {

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  async find(id: string): Promise<Group> {
    return await this.elasticsearchService.findReferenceContent(
      id,
      'enrollmentGroup'
    ) as Group
  }
}
