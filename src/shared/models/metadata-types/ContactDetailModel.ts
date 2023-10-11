import { ContactDetail, ContactPoint, Extension } from 'fhir/r4'

import { ContactPointModel } from '../data-types/ContactPointModel'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ExtensionModel } from '../special-purpose-data-types/ExtensionModel'

export type ContactType = 'Public' | 'Scientific'

export class ContactDetailModel implements ContactDetail {
  private constructor(
    readonly extension: Extension[] | undefined,
    readonly telecom: ContactPoint[] | undefined
  ) {}

  static create(
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    contactType: ContactType | undefined,
    address: string,
    city: string,
    country: string,
    zip: string
  ): ContactDetail {
    const emptyFirstNameIfNull = ModelUtils.undefinedIfNull(firstname)
    const emptyLastnameIfNull = ModelUtils.undefinedIfNull(lastname)
    const emptyPhoneIfNull = ModelUtils.undefinedIfNull(phone)
    const emptyEmailIfNull = ModelUtils.undefinedIfNull(email)

    const extensions: Extension[] = []

    extensions.push(ExtensionModel.createEclaireContactName(emptyFirstNameIfNull, emptyLastnameIfNull))
    extensions.push(ExtensionModel.createEclaireContactAddress(address, city, country, zip))

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
