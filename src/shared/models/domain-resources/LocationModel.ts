import { Address, ContactPoint, Identifier, Location } from 'fhir/r4'

import { NarrativeModel } from './NarrativeModel'
import { AddressModel } from '../data-types/AddressModel'
import { ContactPointModel } from '../data-types/ContactPointModel'
import { IdentifierModel } from '../data-types/IdentifierModel'

export class LocationModel implements Location {
  readonly resourceType: 'Location'

  private constructor(
    readonly id: string | undefined,
    readonly address: Address | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly name: string | undefined,
    readonly telecom: ContactPoint[] | undefined,
    readonly text: NarrativeModel
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
    title: string,
    text: NarrativeModel
  ): Location {
    const lines: string[] = [address, service]

    return new LocationModel(
      id,
      AddressModel.create(lines, city, undefined, undefined),
      [IdentifierModel.createLocation(id)],
      organism,
      [ContactPointModel.createSiteContactName(firstname, name, title)],
      text
    )
  }
}
