import { ContactDetail, ContactPoint } from 'fhir/r4'

import { ContactPointModel } from '../DataType/ContactPointModel'
import { ModelUtils } from '../ModelUtils'

export class ContactDetailModel implements ContactDetail {
  constructor(
    readonly id: string | undefined,
    readonly name: string | undefined,
    readonly telecom: ContactPoint[] | undefined
  ) {}

  static create(
    firstname: string,
    lastname: string,
    phone: string,
    email: string
  ): ContactDetailModel {
    const emptyFirstNameIfNull = ModelUtils.emptyIfNull(firstname)
    const emptyLastnameIfNull = ModelUtils.emptyIfNull(lastname)
    const emptyPhoneIfNull = ModelUtils.emptyIfNull(phone)
    const emptyEmailIfNull = ModelUtils.emptyIfNull(email)

    return new ContactDetailModel(
      undefined,
      `${emptyFirstNameIfNull}, ${emptyLastnameIfNull}`,
      [
        ContactPointModel.createPhone(emptyPhoneIfNull),
        ContactPointModel.createEmail(emptyEmailIfNull),
      ]
    )
  }
}
