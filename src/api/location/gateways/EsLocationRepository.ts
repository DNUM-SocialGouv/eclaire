import { Injectable } from '@nestjs/common'
import { Location } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { LocationRepository } from '../application/contracts/LocationRepository'

@Injectable()
export class EsLocationRepository implements LocationRepository {
  constructor(
    private readonly databaseService: ElasticsearchService
  ) {}

  async find(id: string): Promise<Location[]> {
    return await this.databaseService.findReferenceContent(
      id,
      'locations'
    ) as Location[]
  }
}
