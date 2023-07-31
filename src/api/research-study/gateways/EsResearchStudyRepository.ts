import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Bundle, BundleLink } from 'fhir/r4'

import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'
import { ResearchStudyRepository } from '../application/contracts/ResearchStudyRepository'
import { BundleModel } from '../application/entities/BundleModel'
import { ElasticsearchBodyType } from '../application/entities/ElasticsearchBody'

@Injectable()
export class EsResearchStudyRepository implements ResearchStudyRepository {
  private readonly domainName: string
  private readonly numberOfResourcesByPage: number
  private readonly maxTotalConstraintFromElasticsearch = 10_000

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

  async search(elasticsearchBody: ElasticsearchBodyType): Promise<Bundle> {
    const response = await this.elasticsearchService.search(elasticsearchBody)

    let links: BundleLink[]
    if (response.total === this.maxTotalConstraintFromElasticsearch && elasticsearchBody.sort !== undefined) {
      links = this.buildSearchAfterLinks(response.hits, elasticsearchBody.search_after)
    } else {
      links = this.buildSearchLinks(elasticsearchBody.from, response.total)
    }

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

  private buildSearchAfterLinks(hits: [], searchAfter: (number | string)[]): BundleLink[] {
    const nextSorts = hits.map((hit: { sort: number[] }): number => hit.sort[0]).reverse()
    const nextIds = hits.map((hit: { _source: { id: string }}): string => hit._source.id).reverse()
    const previousSort = searchAfter === undefined ? '' : searchAfter[0]

    const link: BundleLink[] = [
      {
        relation: 'self',
        url: `${this.domainName}R4/ResearchStudy?search_after=${previousSort}`,
      },
      {
        relation: 'next',
        url: `${this.domainName}R4/ResearchStudy?search_after=${nextSorts[0]},${nextIds[0]}`,
      },
    ]

    return link
  }
}
