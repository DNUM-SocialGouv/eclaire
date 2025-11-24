import { Address } from 'fhir/r4'

export class AddressModel implements Address {
  private constructor(
    readonly city: string | undefined,
    readonly country: string | undefined,
    readonly line: string[] | undefined,
    readonly postalCode: string | undefined,
    readonly type: 'postal' | 'physical' | 'both' | undefined,
    readonly use: 'home' | 'work' | 'temp' | 'old' | 'billing' | undefined,
    readonly text: string | undefined
  ) {}

  static create(lines: string[], city: string, postalCode: string, country: string, organizationName: string): Address {
    return new AddressModel(
      city,
      country,
      lines,
      postalCode,
      'physical',
      'work',
      organizationName
    )
  }
}
