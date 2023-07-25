import {
  Address,
  CodeableConcept,
  ContactPoint,
  HumanName,
  OrganizationContact,
} from 'fhir/r4'

import { CodeableConceptModel } from './DataType/CodeableConceptModel'
import { ContactPointModel } from './DataType/ContactPointModel'
import { HumanNameModel } from './DataType/HumanNameModel'

export class OrganizationContactModel implements OrganizationContact {
  constructor(
    readonly address: Address | undefined,
    readonly id: string | undefined,
    readonly name: HumanName | undefined,
    readonly purpose: CodeableConcept | undefined,
    readonly telecom: ContactPoint[] | undefined
  ) {}

  static create(
    contactFirstname: string,
    contactName: string,
    contactPhone: string,
    contactMail: string
  ) {
    return new OrganizationContactModel(
      undefined,
      undefined,
      HumanNameModel.create(contactFirstname, contactName),
      CodeableConceptModel.createOrganizationContactPurpose(),
      [
        ContactPointModel.createPhone(contactPhone),
        ContactPointModel.createEmail(contactMail),
      ]
    )
  }
}
