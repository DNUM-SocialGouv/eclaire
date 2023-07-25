import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Bundle, BundleLink } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { ResearchStudyRepository } from '../application/contracts/ResearchStudyRepository'
import { BundleModel } from '../application/entities/BundleModel'
import { SearchBodyType } from '../application/entities/SearchBody'

@Injectable()
export class EsResearchStudyRepository implements ResearchStudyRepository {
  readonly domainName: string
  readonly numberOfResourcesByPage: number

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly configService: ConfigService
  ) {
    this.domainName = this.configService.get<string>('ECLAIRE_URL')
    this.numberOfResourcesByPage = Number(this.configService.get<string>('NUMBER_OF_RESOURCES_BY_PAGE'))
  }

  async findOne(id: string): Promise<unknown> {
    return await this.elasticsearchService.findOneDocument(id)
  }

  async search(bodySearch: SearchBodyType): Promise<Bundle> {
    const response = await this.elasticsearchService.search(bodySearch)
    const links = this.buildSearchLinks(bodySearch.from, response.total)

    return BundleModel.create(response.hits, links, response.total, `${this.domainName}R4/ResearchStudy`)
  }

  private buildSearchLinks(offset: number, total: number): BundleLink[] {
    const hasMoreResult = total > offset * this.numberOfResourcesByPage
    const link: BundleLink[] = [
      {
        relation: 'self',
        url: `${this.domainName}R4/ResearchStudy?_getpagesoffset=${offset}`,
      },
    ]

    if (hasMoreResult) {
      link.push({
        relation: 'next',
        url: `${this.domainName}R4/ResearchStudy?_getpagesoffset=${offset + this.numberOfResourcesByPage}`,
      })
    }

    return link
  }
}
