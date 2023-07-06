import { ContactDetail, ContactPoint } from 'fhir/r4'

import { ContactPointModel } from '../../ContactPointModel'

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
  ) {
    return new ContactDetailModel(
      undefined,
      `${firstname}, ${lastname}`,
      [
        ContactPointModel.createPhone(phone),
        ContactPointModel.createEmail(email),
      ]
    )
  }
}
