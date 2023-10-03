import { Bundle, BundleEntry, BundleLink, FhirResource } from 'fhir/r4'

import { BundleEntryModel } from '../backbone-elements/BundleEntryModel'
import { SearchResponse, SearchResponseHits } from 'src/shared/elasticsearch/ElasticsearchService'

export class BundleModel {
  static create(resources: SearchResponse['hits'], links: BundleLink[], total: number): Bundle {
    return {
      entry: resources.map((resource: SearchResponseHits): BundleEntry => {
        return BundleEntryModel.create(resource._source as unknown as FhirResource)
      }),
      link: links,
      resourceType: 'Bundle',
      total,
      type: 'searchset',
    }
  }
}