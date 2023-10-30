import { Group } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { GroupRepository } from '../application/contracts/GroupRepository'

export class EsGroupRepository implements GroupRepository {
  constructor(
    private readonly databaseService: ElasticsearchService
  ) {}

  async find(id: string): Promise<Group> {
    return await this.databaseService.findReferenceContent(
      id,
      'enrollmentGroup'
    ) as Group
  }
}
