import { BundleEntry, FhirResource } from 'fhir/r4'

export class BundleEntryModel {
  static create(_source: FhirResource): BundleEntry {
    const domain = process.env['ECLAIRE_URL']
    return {
      fullUrl: `${domain}R4/${_source.resourceType}/${_source.id}`,
      resource: _source,
    }
  }
}
