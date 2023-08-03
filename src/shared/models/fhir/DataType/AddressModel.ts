import { Address, Period } from 'fhir/r4'

export class AddressModel implements Address {
  constructor(
    readonly city: string | undefined,
    readonly country: string | undefined,
    readonly district: string | undefined,
    readonly line: string[] | undefined,
    readonly period: Period | undefined,
    readonly postalCode: string | undefined,
    readonly state: string | undefined,
    readonly text: string | undefined,
    readonly type: 'postal' | 'physical' | 'both' | undefined,
    readonly use: 'home' | 'work' | 'temp' | 'old' | 'billing' | undefined
  ) {}

  static create(sponsorAdress: string, sponsorCity: string, sponsorPostalCode: string, sponsorCountry: string): AddressModel {
    return new AddressModel(
      sponsorCity,
      sponsorCountry,
      undefined,
      [sponsorAdress],
      undefined,
      sponsorPostalCode,
      undefined,
      undefined,
      'physical',
      'work'
    )
  }
}
