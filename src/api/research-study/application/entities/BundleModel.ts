import { Bundle, BundleEntry, BundleLink, FhirResource } from 'fhir/r4'

export class BundleModel {
  static create(resources: FhirResource[], links: BundleLink[], total: number, domainName: string): Bundle {
    return {
      entry: resources.map((resource): BundleEntry => ({ fullUrl: `${domainName}/${resource.id}`, resource })),
      link: links,
      resourceType: 'Bundle',
      total,
      type: 'searchset',
    }
  }
}
