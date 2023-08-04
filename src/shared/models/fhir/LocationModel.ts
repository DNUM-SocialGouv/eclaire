import { Address, ContactPoint, Identifier, Location } from 'fhir/r4'

import { AddressModel } from './DataTypes/AddressModel'
import { ContactPointModel } from './DataTypes/ContactPointModel'
import { IdentifierModel } from './DataTypes/IdentifierModel'

export class LocationModel implements Location {
  readonly resourceType: 'Location'

  constructor(
    readonly id: string | undefined,
    readonly address: Address | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly name: string | undefined,
    readonly telecom: ContactPoint[] | undefined
  ) {
    this.resourceType = 'Location'
  }

  static create(
    id: string,
    address: string,
    city: string,
    firstname: string,
    name: string,
    organism: string,
    service: string,
    title: string
  ) {
    const lines: string[] = [address, service]
    return new LocationModel(
      id,
      AddressModel.create(lines, city, undefined, undefined),
      [IdentifierModel.createLocation(id)],
      organism,
      [ContactPointModel.createSiteContactName(firstname, name, title)]
    )
  }
}
