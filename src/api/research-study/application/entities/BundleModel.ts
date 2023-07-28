import { Bundle, BundleEntry, BundleLink } from 'fhir/r4'

export class BundleModel {
  static create(resources: [], links: BundleLink[], total: number, domainName: string): Bundle {
    return {
      // @ts-ignore
      entry: resources.map((resource: { _source: { id: string }}): BundleEntry => ({ fullUrl: `${domainName}/${resource._source.id}`, resource: resource._source })),
      link: links,
      resourceType: 'Bundle',
      total,
      type: 'searchset',
    }
  }
}
