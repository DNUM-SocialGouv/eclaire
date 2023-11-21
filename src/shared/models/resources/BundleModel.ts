import { Bundle, BundleEntry, BundleLink, FhirResource } from 'fhir/r4'

import { SearchResponse, SearchResponseHits } from '../../elasticsearch/ElasticsearchService'
import { BundleEntryModel } from '../backbone-elements/BundleEntryModel'

export class BundleModel {
  static create(resources: SearchResponse['hits'], links: BundleLink[], total: number, domainName: string): Bundle {
    return {
      resourceType: 'Bundle',
      // eslint-disable-next-line sort-keys
      entry: resources.map((resource: SearchResponseHits): BundleEntry => {
        return BundleEntryModel.create(resource._source as unknown as FhirResource, domainName)
      }),
      link: links,
      total,
      type: 'searchset',
    }
  }
}
