import { Bundle, BundleEntry, BundleLink, FhirResource } from 'fhir/r4'

export class BundleModelFactory {
  static create(entry: BundleEntry<FhirResource>[], link: BundleLink[], total: number): Bundle {
    return {
      entry,
      link,
      resourceType: 'Bundle',
      total,
      type: 'searchset',
    }
  }
}
