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

  static create(lines: string[], city: string, postalCode: string, country: string): AddressModel {
    return new AddressModel(
      city,
      country,
      undefined,
      lines,
      undefined,
      postalCode,
      undefined,
      undefined,
      'physical',
      'work'
    )
  }
}
