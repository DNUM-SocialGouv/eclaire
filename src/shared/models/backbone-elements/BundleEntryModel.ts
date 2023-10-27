import { BundleEntry, FhirResource } from 'fhir/r4'

export class BundleEntryModel {
  static create(_source: FhirResource, domainName: string): BundleEntry {
    return {
      fullUrl: `${domainName}R4/${_source.resourceType}/${_source.id}`,
      resource: _source,
    }
  }
}
