import { ConfigService } from '@nestjs/config'
import { Bundle, BundleEntry, BundleLink, CodeableConcept, Extension, Group, Location, Organization } from 'fhir/r4'

import { convertFhirParsedQueryParamsToElasticsearchQuery } from './converter/convertFhirParsedQueryParamsToElasticsearchQuery'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { ElasticsearchService, SearchResponse } from '../../../shared/elasticsearch/ElasticsearchService'
import { BundleEntryModel } from '../../../shared/models/backbone-elements/BundleEntryModel'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { TranslatedContentModel } from '../../../shared/models/eclaire/TranslatedContentModel'
import { BundleModel } from '../../../shared/models/resources/BundleModel'
import { ResearchStudyRepository } from '../application/ResearchStudyRepository'
import { FhirParsedQueryParams } from '../controllers/FhirQueryParams'

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

  async findOne(id: string): Promise<ResearchStudyModel> {
    const document: ResearchStudyModel = await this.databaseService.findOneDocument(id) as ResearchStudyModel
    return this.applyTranslationsToResearchStudyModel(document)
  }

  private applyTranslationsToResearchStudyModel(document: ResearchStudyModel): ResearchStudyModel {
    const translatedContent: TranslatedContentModel = document.translatedContent

    if (translatedContent === undefined) {
      return document
    }

    const extensionToTranslate: Extension = document.extension
      .find((value: Extension) => value.url.includes('eclaire-therapeutic-area'))

    if (extensionToTranslate && translatedContent.therapeuticArea) {
      extensionToTranslate.valueString = translatedContent.therapeuticArea
    }

    const diseaseConditionToTranslate: CodeableConcept = document.condition
      .find((value: CodeableConcept) => value.text === 'diseaseCondition')

    if (diseaseConditionToTranslate && translatedContent.diseaseCondition) {
      diseaseConditionToTranslate.coding[0].display = translatedContent.diseaseCondition
    }

    delete document.translatedContent

    return {
      resourceType: document.resourceType,
      ...document,
      title: translatedContent.title,
    } as ResearchStudyModel
  }

  async search(fhirParsedQueryParams: FhirParsedQueryParams[]): Promise<Bundle> {
    const elasticsearchBody: ElasticsearchBodyType = convertFhirParsedQueryParamsToElasticsearchQuery(
      fhirParsedQueryParams,
      this.numberOfResourcesByPage
    )

    const withReferenceContents: boolean = fhirParsedQueryParams.some(
      (param: FhirParsedQueryParams) => param.name === '_include' && param.value === '*'
    )
    const response: SearchResponse = await this.databaseService.search(elasticsearchBody, withReferenceContents)

    const links: BundleLink[] = []
    if (response.total === this.maxTotalConstraintFromElasticsearch && elasticsearchBody.sort !== undefined) {
      this.buildSearchAfterLinks(links, response.hits, fhirParsedQueryParams)
    } else {
      this.buildSearchLinks(links, elasticsearchBody.from, response.total, fhirParsedQueryParams)
    }

    const fhirResourceBundle: Bundle = BundleModel.create(
      response.hits,
      links,
      response.total,
      this.configService.get('ECLAIRE_URL')
    )

    if (withReferenceContents) {
      const additionalFhirResourceBundle: BundleEntry[] = this.getAdditionalFhirResourceBundle(fhirResourceBundle)
      fhirResourceBundle.entry.push(...additionalFhirResourceBundle)
    }

    return fhirResourceBundle
  }

  private buildSearchLinks(links: BundleLink[], offset: number, total: number, queryParams: FhirParsedQueryParams[]) {
    const hasMoreResult = total > offset * this.numberOfResourcesByPage
    const hasMoreResultsThanResourcesPerPage = total > this.numberOfResourcesByPage

    const removePagesOffsetParam = (queryParam: FhirParsedQueryParams): boolean => queryParam.name !== '_getpagesoffset'
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

  private buildSearchAfterLinks(links: BundleLink[], hits: SearchResponse['hits'], queryParams: FhirParsedQueryParams[]) {
    const nextSorts = hits.map((hit): number | string => hit.sort[0]).reverse()
    const nextIds = hits.map((hit): string => hit._source.id).reverse()

    this.buildSelfLink(links, queryParams)

    const removeSearchAfterParam = (queryParam: FhirParsedQueryParams): boolean => queryParam.name !== 'search_after'
    const nextUrl = this.buildUrl([
      ...queryParams.filter(removeSearchAfterParam),
      { name: 'search_after', value: `${nextSorts[0]},${nextIds[0]}` },
    ])

    links.push({
      relation: 'next',
      url: nextUrl,
    })
  }

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
