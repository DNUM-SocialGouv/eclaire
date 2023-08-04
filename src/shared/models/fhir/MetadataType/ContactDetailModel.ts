import { ContactDetail, ContactPoint, Extension } from 'fhir/r4'

import { ModelUtils } from '../../custom/ModelUtils'
import { ContactPointModel } from '../DataType/ContactPointModel'
import { ExtensionModel } from '../SpecialPurposeDataType/ExtensionModel'

export type ContactType = 'Public' | 'Scientific';

export class ContactDetailModel implements ContactDetail {
  constructor(
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
  ): ContactDetailModel {
    const emptyFirstNameIfNull = ModelUtils.emptyIfNull(firstname)
    const emptyLastnameIfNull = ModelUtils.emptyIfNull(lastname)
    const emptyPhoneIfNull = ModelUtils.emptyIfNull(phone)
    const emptyEmailIfNull = ModelUtils.emptyIfNull(email)

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
