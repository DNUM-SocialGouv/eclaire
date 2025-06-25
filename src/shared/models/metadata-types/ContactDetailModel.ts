import { ContactDetail, ContactPoint, Extension } from 'fhir/r4'

import { ContactPointModel } from '../data-types/ContactPointModel'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ExtensionModel } from '../special-purpose-data-types/ExtensionModel'

export type ContactType = 'Public' | 'Scientific'

export class ContactDetailModel implements ContactDetail {
  private constructor(
    readonly extension: Extension[] | undefined,
    readonly telecom: ContactPoint[] | undefined
  ) { }

  static create(
    firstname: string,
    middleName: string,
    lastname: string,
    phone: string,
    email: string,
    contactType: ContactType | undefined,
    address: string,
    city: string,
    country: string,
    zip: string,
    affiliation: string,
  ): ContactDetail {
    const emptyFirstNameIfNull = ModelUtils.undefinedIfNull(firstname)
    const emptyMiddleNameIfNull = ModelUtils.undefinedIfNull(middleName)
    const emptyLastnameIfNull = ModelUtils.undefinedIfNull(lastname)
    const emptyPhoneIfNull = ModelUtils.undefinedIfNull(phone)
    const emptyEmailIfNull = ModelUtils.undefinedIfNull(email)

    const extensions: Extension[] = []

    extensions.push(ExtensionModel.createEclaireContactName(emptyFirstNameIfNull, emptyMiddleNameIfNull, emptyLastnameIfNull))

    const contactAdress = ModelUtils.undefinedIfNull(address)
    const contactCity = ModelUtils.undefinedIfNull(city)
    const contactCountry = ModelUtils.undefinedIfNull(country)
    const contactZip = ModelUtils.undefinedIfNull(zip);
    if (contactAdress || contactCity || contactCountry || contactZip) {
      extensions.push(ExtensionModel.createEclaireContactAddress(address, city, country, zip))
    }
    ExtensionModel.createEclaireContactAffiliation(affiliation)

    /* TODO - Décommenter quand address, city, country, zip et affiliation seront disponibles
      extensions.push(eclaireContactAddress, eclaireContactAffiliation)
     */

    if (contactType) {
      extensions.push(ExtensionModel.createEclaireContactType(contactType))
    }

    return new ContactDetailModel(
      extensions,
      [
        ContactPointModel.createPhone(emptyPhoneIfNull),
        ContactPointModel.createEmail(emptyEmailIfNull),
      ]
    )
  }
}
