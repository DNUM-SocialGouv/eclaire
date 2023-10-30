import { Bundle, BundleEntry, BundleLink, FhirResource } from 'fhir/r4'

import { SearchResponse, SearchResponseHits } from '../../../shared/elasticsearch/ElasticsearchService'
import { BundleEntryModel } from '../backbone-elements/BundleEntryModel'

export class BundleModel {
  static create(resources: SearchResponse['hits'], links: BundleLink[], total: number, domainName: string): Bundle {
    return {
      entry: resources.map((resource: SearchResponseHits): BundleEntry => {
        return BundleEntryModel.create(resource._source as unknown as FhirResource, domainName)
      }),
      link: links,
      resourceType: 'Bundle',
      total,
      type: 'searchset',
    }
  }
}
