import { Address } from 'fhir/r4'

export class AddressModel implements Address {
  constructor(
    readonly city: string | undefined,
    readonly country: string | undefined,
    readonly line: string[] | undefined,
    readonly postalCode: string | undefined,
    readonly type: 'postal' | 'physical' | 'both' | undefined,
    readonly use: 'home' | 'work' | 'temp' | 'old' | 'billing' | undefined
  ) {}

  static create(lines: string[], city: string, postalCode: string, country: string): AddressModel {
    return new AddressModel(
      city,
      country,
      lines,
      postalCode,
      'physical',
      'work'
    )
  }
}
