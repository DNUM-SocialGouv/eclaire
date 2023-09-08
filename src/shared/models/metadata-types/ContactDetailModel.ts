import { ContactDetail, ContactPoint, Extension } from 'fhir/r4'

import { ContactPointModel } from '../data-types/ContactPointModel'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ExtensionModel } from '../special-purpose-data-types/ExtensionModel'

export type ContactType = 'Public' | 'Scientific'

export class ContactDetailModel implements ContactDetail {
  private constructor(
    readonly extension: Extension[] | undefined,
    readonly name: string | undefined,
    readonly telecom: ContactPoint[] | undefined
  ) {}

  static create(
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    contactType: ContactType | undefined
  ): ContactDetail {
    const emptyFirstNameIfNull = ModelUtils.undefinedIfNull(firstname)
    const emptyLastnameIfNull = ModelUtils.undefinedIfNull(lastname)
    const emptyPhoneIfNull = ModelUtils.undefinedIfNull(phone)
    const emptyEmailIfNull = ModelUtils.undefinedIfNull(email)

    let extensions: Extension[] = undefined

    if (contactType) {
      extensions = [ExtensionModel.createEclaireContactType(contactType)]
    }

    return new ContactDetailModel(
      extensions,
      `${emptyFirstNameIfNull} ${emptyLastnameIfNull}`,
      [
        ContactPointModel.createPhone(emptyPhoneIfNull),
        ContactPointModel.createEmail(emptyEmailIfNull),
      ]
    )
  }
}
