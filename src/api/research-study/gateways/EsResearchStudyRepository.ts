import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Bundle, BundleLink, ResearchStudy } from 'fhir/r4'

import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse } from '../../../shared/elasticsearch/ElasticsearchService'
import { BundleModel } from '../../../shared/models/resources/BundleModel'
import { ResearchStudyRepository } from '../application/contracts/ResearchStudyRepository'
import { ResearchStudyQueryParams } from '../controllers/converter/ResearchStudyQueryParams'

@Injectable()
export class EsResearchStudyRepository implements ResearchStudyRepository {
  private readonly domainName: string
  private readonly numberOfResourcesByPage: number
  private readonly maxTotalConstraintFromElasticsearch = 10_000

  constructor(
    private readonly databaseService: ElasticsearchService,
    private readonly configService: ConfigService
  ) {
    this.domainName = this.configService.get<string>('ECLAIRE_URL')
    this.numberOfResourcesByPage = Number(this.configService.get<string>('NUMBER_OF_RESOURCES_BY_PAGE'))
  }

  async findOne(id: string): Promise<ResearchStudy> {
    return await this.databaseService.findOneDocument(id) as ResearchStudy
  }

  async search(
    elasticsearchBody: ElasticsearchBodyType,
    queryParams: ResearchStudyQueryParams[],
    withReferenceContents: boolean = false
  ): Promise<Bundle> {
    const response: SearchResponse = await this.databaseService.search(elasticsearchBody, withReferenceContents)

    const links: BundleLink[] = []
    if (response.total === this.maxTotalConstraintFromElasticsearch && elasticsearchBody.sort !== undefined) {
      this.buildSearchAfterLinks(links, response.hits, queryParams)
    } else {
      this.buildSearchLinks(links, elasticsearchBody.from, response.total, queryParams)
    }

    return BundleModel.create(
      response.hits,
      links,
      response.total,
      this.configService.get('ECLAIRE_URL')
    )
  }

  private buildSearchLinks(links: BundleLink[], offset: number, total: number, queryParams: ResearchStudyQueryParams[]) {
    const hasMoreResult = total > offset * this.numberOfResourcesByPage
    const hasMoreResultsThanResourcesPerPage = total > this.numberOfResourcesByPage

    const removePagesOffsetParam = (queryParam: ResearchStudyQueryParams): boolean => queryParam.name !== '_getpagesoffset'
    const nextUrl = this.buildUrl([
      ...queryParams.filter(removePagesOffsetParam),
      { name: '_getpagesoffset', value: `${offset + this.numberOfResourcesByPage}` },
    ])

    this.buildSelfLink(links, queryParams)

    if (hasMoreResult && hasMoreResultsThanResourcesPerPage) {
      links.push({
        relation: 'next',
        url: nextUrl,
      })
    }
  }

  private buildSearchAfterLinks(links: BundleLink[], hits: SearchResponse['hits'], queryParams: ResearchStudyQueryParams[]) {
    const nextSorts = hits.map((hit): number | string => hit.sort[0]).reverse()
    const nextIds = hits.map((hit): string => hit._source.id).reverse()

    this.buildSelfLink(links, queryParams)

    const removeSearchAfterParam = (queryParam: ResearchStudyQueryParams): boolean => queryParam.name !== 'search_after'
    const nextUrl = this.buildUrl([
      ...queryParams.filter(removeSearchAfterParam),
      { name: 'search_after', value: `${nextSorts[0]},${nextIds[0]}` },
    ])

    links.push({
      relation: 'next',
      url: nextUrl,
    })
  }

  private buildSelfLink(links: BundleLink[], queryParams: ResearchStudyQueryParams[]) {
    links.push(
      {
        relation: 'self',
        url: this.buildUrl(queryParams),
      }
    )
  }

  private buildUrl(queryParams: ResearchStudyQueryParams[]): string {
    const url: URL = new URL(this.domainName)
    url.pathname = 'R4/ResearchStudy'

    for (const queryParam of queryParams) {
      url.searchParams.append(queryParam.name, queryParam.value)
    }

    return url.toString()
  }
}
