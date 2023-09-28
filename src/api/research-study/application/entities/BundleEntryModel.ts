import { BundleEntry, FhirResource } from 'fhir/r4'

export class BundleEntryModel {
  static create(domainName: string, _source: FhirResource): BundleEntry {
    return {
      fullUrl: `${domainName}/${_source.id}`,
      resource: _source,
    }
  }
}
