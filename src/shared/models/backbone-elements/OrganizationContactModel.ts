import {
  CodeableConcept,
  ContactPoint,
  HumanName,
  OrganizationContact,
} from 'fhir/r4'

import { CodeableConceptModel } from '../data-types/CodeableConceptModel'
import { ContactPointModel } from '../data-types/ContactPointModel'
import { HumanNameModel } from '../data-types/HumanNameModel'

export class OrganizationContactModel implements OrganizationContact {
  private constructor(
    readonly name: HumanName | undefined,
    readonly purpose: CodeableConcept | undefined,
    readonly telecom: ContactPoint[] | undefined
  ) {}

  static create(
    contactFirstname: string,
    contactName: string,
    contactPhone: string,
    contactMail: string
  ): OrganizationContact {
    return new OrganizationContactModel(
      HumanNameModel.create(contactFirstname, undefined, contactName, undefined),
      CodeableConceptModel.createOrganizationContactPurpose(),
      [
        ContactPointModel.createPhone(contactPhone),
        ContactPointModel.createEmail(contactMail),
      ]
    )
  }
}
