import { ConfigService } from '@nestjs/config'
import { Bundle, BundleEntry, BundleLink, CodeableConcept, Extension, Group, Location, Organization } from 'fhir/r4'

import { convertFhirParsedQueryParamsToElasticsearchQuery } from './converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'
import { BundleEntryModel } from '../../../shared/models/backbone-elements/BundleEntryModel'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { TranslatedContentModel } from '../../../shared/models/eclaire/TranslatedContentModel'
import { BundleModel } from '../../../shared/models/resources/BundleModel'
import { ResearchStudyRepository } from '../application/ResearchStudyRepository'
import { FhirParsedQueryParams } from '../controllers/FhirQueryParams'

export class EsResearchStudyRepository implements ResearchStudyRepository {
  private readonly domainName: string
  private readonly defaultNumberOfResourcesByPage: number
  private numberOfResourcesByPage: number
  //private readonly maxTotalConstraintFromElasticsearch = 10_000

  constructor(
    private readonly databaseService: ElasticsearchService,
    private readonly configService: ConfigService
  ) {
    this.domainName = this.configService.get<string>('ECLAIRE_URL')
    this.defaultNumberOfResourcesByPage = Number(this.configService.get<string>('NUMBER_OF_RESOURCES_BY_PAGE'))
    this.numberOfResourcesByPage = Number(this.configService.get<string>('NUMBER_OF_RESOURCES_BY_PAGE'))
  }

  async findOne(id: string): Promise<ResearchStudyModel> {
    const document: ResearchStudyModel = await this.databaseService.findOneDocument(id) as ResearchStudyModel
    const translatedResearchStudyModel: ResearchStudyModel = this.applyTranslationsToResearchStudyModel(document)
    delete translatedResearchStudyModel.originalContentsToEnhance
    return translatedResearchStudyModel
  }

  private applyTranslationsToResearchStudyModel(document: ResearchStudyModel): ResearchStudyModel {
    const translatedContent: TranslatedContentModel = document.translatedContent

    if (translatedContent === undefined) {
      return document
    }

    if (document.extension) {
      const extensionToTranslate: Extension = document.extension
        .find((value: Extension) => value.url.includes('eclaire-therapeutic-area'))

      if (extensionToTranslate && translatedContent.therapeuticArea) {
        extensionToTranslate.valueString = translatedContent.therapeuticArea
      }
    }

    if (document.condition) {
      const diseaseConditionToTranslate: CodeableConcept = document.condition
        .find((value: CodeableConcept) => value.coding === undefined)

      if (diseaseConditionToTranslate && translatedContent.diseaseCondition) {
        diseaseConditionToTranslate.text = translatedContent.diseaseCondition
      }
    }

    let title: string

    if (document.title) {
      title = document.title

      if (title && translatedContent.title) {
        title = translatedContent.title
      }
    }

    delete document.translatedContent

    return {
      resourceType: document.resourceType,
      ...document,
      title,
    } as ResearchStudyModel
  }

  async search(fhirParsedQueryParams: FhirParsedQueryParams[]): Promise<Bundle> {
    let queryParams = fhirParsedQueryParams
    queryParams = queryParams.map((item) => {
      if (item.name === '_count' && Number(item.value) > 1000) {
        return { ...item, value: String(this.defaultNumberOfResourcesByPage) } // overwrite value with "20"
      }
      return item
    })

    // Check if "_count" exists
    const hasCount = queryParams.some((param) => param.name === '_count')
    if (!hasCount) {
      // Spread into a new array since original is Readonly
      queryParams = [
        ...queryParams,
        { name: '_count', value: String(this.defaultNumberOfResourcesByPage) },
      ]
    }

    const elasticsearchBody: ElasticsearchBodyType = convertFhirParsedQueryParamsToElasticsearchQuery(
      queryParams,
      this.numberOfResourcesByPage
    )
    this.numberOfResourcesByPage = Number(elasticsearchBody.size)
    const withReferenceContents: boolean = queryParams.some(
      (param: FhirParsedQueryParams) => param.name === '_include' && param.value === '*'
    )

    const responseTotal = await this.databaseService.getCountDocuments(elasticsearchBody.query)
    const response: SearchResponse = await this.databaseService.search(elasticsearchBody, withReferenceContents)

    const links: BundleLink[] = []

    if (response.hits.length > 0) {
      this.buildSearchLinks(links, elasticsearchBody.from, responseTotal, queryParams)
    }

    const translatedResponse = response.hits.map((hit: SearchResponseHits) => {
      const translatedResearchStudyModel: ResearchStudyModel = this.applyTranslationsToResearchStudyModel(hit._source as unknown as ResearchStudyModel)
      delete translatedResearchStudyModel.originalContentsToEnhance
      return {
        ...hit,
        _source: translatedResearchStudyModel as unknown as Record<string, string>,
      }
    })

    const fhirResourceBundle: Bundle = BundleModel.create(
      translatedResponse,
      links,
      responseTotal,
      this.configService.get('ECLAIRE_URL')
    )

    if (withReferenceContents) {
      const additionalFhirResourceBundle: BundleEntry[] = this.getAdditionalFhirResourceBundle(fhirResourceBundle)
      fhirResourceBundle.entry.push(...additionalFhirResourceBundle)
    }

    return fhirResourceBundle
  }

  private buildSearchLinks(links: BundleLink[], offset: number, total: number, queryParams: FhirParsedQueryParams[]) {
    const hasMoreResult = total > (offset + this.numberOfResourcesByPage)
    const hasMoreResultsThanResourcesPerPage = total > this.numberOfResourcesByPage

    const removePagesOffsetParam = (queryParam: FhirParsedQueryParams): boolean => (queryParam.name !== '_getpagesoffset' && queryParam.name !== '_count')
    const nextUrl = this.buildUrl([
      ...queryParams.filter(removePagesOffsetParam),
      { name: '_count', value: `${this.numberOfResourcesByPage}` },
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

  /* private buildSearchAfterLinks(links: BundleLink[], hits: SearchResponse['hits'], queryParams: FhirParsedQueryParams[]) {
    // take the last document’s sort array
    const lastSort = hits[hits.length - 1].sort;

    this.buildSelfLink(links, queryParams)

    const removeSearchAfterParam = (queryParam: FhirParsedQueryParams): boolean => queryParam.name !== 'search_after'
    const nextUrl = this.buildUrl([
      ...queryParams.filter(removeSearchAfterParam),
      { name: 'search_after', value: `${lastSort}` },
    ])

    links.push({
      relation: 'next',
      url: nextUrl,
    })
  } */

  private buildSelfLink(links: BundleLink[], queryParams: FhirParsedQueryParams[]) {
    links.push(
      {
        relation: 'self',
        url: this.buildUrl(queryParams),
      }
    )
  }

  private buildUrl(queryParams: FhirParsedQueryParams[]): string {
    const url: URL = new URL(this.domainName)
    url.pathname = 'R4/ResearchStudy'

    for (const queryParam of queryParams) {
      url.searchParams.append(queryParam.name, queryParam.value)
    }

    return url.toString()
  }

  private getAdditionalFhirResourceBundle(fhirResourceBundle: Bundle): BundleEntry[] {
    const additionalFhirResourceBundleEntries = []

    for (const bundleEntry of fhirResourceBundle.entry) {
      const referenceContents: unknown = bundleEntry.resource['referenceContents']

      const enrollmentGroup: Group = referenceContents['enrollmentGroup'] as Group
      if (enrollmentGroup) {
        const enrollmentGroupBundleEntry: BundleEntry = BundleEntryModel.create(enrollmentGroup, this.configService.get('ECLAIRE_URL'))
        additionalFhirResourceBundleEntries.push(enrollmentGroupBundleEntry)
      }

      const locations: Location[] = referenceContents['locations'] as Location[]
      if (locations) {
        const locationBundleEntries: BundleEntry[] = locations.map((location: Location) => {
          return BundleEntryModel.create(location, this.configService.get('ECLAIRE_URL'))
        })

        additionalFhirResourceBundleEntries.push(...locationBundleEntries)
      }

      const organizations: Organization[] = referenceContents['organizations'] as Organization[]
      if (organizations) {
        const organizationBundleEntries: BundleEntry[] = organizations.map((organization: Organization) => {
          return BundleEntryModel.create(organization, this.configService.get('ECLAIRE_URL'))
        })

        additionalFhirResourceBundleEntries.push(...organizationBundleEntries)
      }

      delete bundleEntry.resource['referenceContents']
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const bundleIds = additionalFhirResourceBundleEntries.map((bundle) => bundle.resource.id)
    const additionalFhirResourceBundleEntriesFiltered =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      additionalFhirResourceBundleEntries.filter((bundle, index) => !bundleIds.includes(bundle.resource.id, index + 1))

    return [...additionalFhirResourceBundleEntriesFiltered as BundleEntry[]]
  }
}
