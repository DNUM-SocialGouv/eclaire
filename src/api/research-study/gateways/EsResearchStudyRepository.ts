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

    const selfUrl = this.createUrl([{ name: '_getpagesoffset', value: String(offset) }])
    const nextUrl = this.createUrl([{ name: '_getpagesoffset', value: `${offset + this.numberOfResourcesByPage}` }])

    const link: BundleLink[] = [
      {
        relation: 'self',
        url: selfUrl,
      },
    ]

    if (hasMoreResult) {
      link.push({
        relation: 'next',
        url: nextUrl,
      })
    }

    return link
  }

  private buildSearchAfterLinks(hits: [], searchAfter: (number | string)[]): BundleLink[] {
    const nextSorts = hits.map((hit: { sort: number[] }): number => hit.sort[0]).reverse()
    const nextIds = hits.map((hit: { _source: { id: string }}): string => hit._source.id).reverse()
    const previousSort = searchAfter === undefined ? '' : searchAfter[0]

    const selfUrl = this.createUrl([{ name: 'search_after', value: String(previousSort) }])
    const nextUrl = this.createUrl([{ name: 'search_after', value: `${nextSorts[0]},${nextIds[0]}` }])

    const link: BundleLink[] = [
      {
        relation: 'self',
        url: selfUrl,
      },
      {
        relation: 'next',
        url: nextUrl,
      },
    ]

    return link
  }

  private createUrl(params: { name: string, value: string }[]): string {
    const url = new URL(this.domainName)
    url.pathname = 'R4/ResearchStudy'

    for (const param of params) {
      url.searchParams.append(param.name, param.value)
    }

    return url.toString()
  }
}
