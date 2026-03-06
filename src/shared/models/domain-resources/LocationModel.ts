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
    postalCode: string,
    courriel: string,
    telephone: string,
    text: NarrativeModel
  ): Location {
    const lines: string[] = [address, service]

    const telecomContact = []
    if (courriel) telecomContact.push(ContactPointModel.createEmail(courriel))
    if (telephone) telecomContact.push(ContactPointModel.createPhone(telephone))
    if (firstname || name || title) telecomContact.push(ContactPointModel.createSiteContactName(firstname, name, title))

    return new LocationModel(
      id,
      AddressModel.create(lines, city, postalCode, 'FR'),
      [IdentifierModel.createLocation(id)],
      organism,
      telecomContact.length ? telecomContact : undefined,
      text
    )
  }
}
