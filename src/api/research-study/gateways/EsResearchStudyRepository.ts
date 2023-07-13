import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Bundle, BundleLink } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { ResearchStudyRepository } from '../application/contracts/ResearchStudyRepository'
import { BundleModelFactory } from '../application/entities/BundleModelFactory'
import { SearchBodyType } from '../application/entities/SearchBody'

@Injectable()
export class EsResearchStudyRepository implements ResearchStudyRepository {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly configService: ConfigService
  ) {}

  async findOne(id: string): Promise<unknown> {
    return await this.elasticsearchService.findOneDocument(id)
  }

  async search(bodySearch: SearchBodyType): Promise<Bundle> {
    const response = await this.elasticsearchService.search(bodySearch)
    const link = this.buildSearchLink(bodySearch.from, response.total)

    return BundleModelFactory.create(response.hits, link, response.total)
  }

  private buildSearchLink(offset: number, total: number): BundleLink[] {
    const numberOfRessourceByPage = Number(this.configService.get<string>('NUMBER_OF_RESSOURCE_BY_PAGE'))
    const hasMoreResult = total > offset * numberOfRessourceByPage
    const link: BundleLink[] = [
      {
        relation: 'self',
        url: `${this.configService.get<string>('ECLAIRE_URL')}R4/ResearchStudy?_getpagesoffset=${offset}`,
      },
    ]

    if (hasMoreResult) {
      link.push({
        relation: 'next',
        url: `${this.configService.get<string>('ECLAIRE_URL')}R4/ResearchStudy?_getpagesoffset=${offset + numberOfRessourceByPage}`,
      })
    }

    return link
  }
}
