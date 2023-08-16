import { Bundle, BundleEntry, BundleLink, FhirResource } from 'fhir/r4'

import { SearchResponse } from 'src/shared/elasticsearch/ElasticsearchService'

export class BundleModel {
  static create(resources: SearchResponse['hits'], links: BundleLink[], total: number, domainName: string): Bundle {
    return {
      entry: resources.map((resource): BundleEntry => ({ fullUrl: `${domainName}/${resource._source.id}`, resource: resource._source as unknown as FhirResource })),
      link: links,
      resourceType: 'Bundle',
      total,
      type: 'searchset',
    }
  }
}
