import {
  Address,
  CodeableConcept,
  ContactPoint,
  FhirResource,
  Identifier,
  Meta,
  Organization,
  OrganizationContact,
  Reference,
} from 'fhir/r4'

import { AddressModel } from './DataType/AddressModel'
import { CodeableConceptModel } from './DataType/CodeableConceptModel'
import { OrganizationContactModel } from './OrganizationContactModel'
import { ModelUtils } from '../custom/ModelUtils'

export class OrganizationModel implements Organization {
  readonly resourceType: 'Organization'

  constructor(
    readonly active: boolean | undefined,
    readonly address: Address[] | undefined,
    readonly alias: string[] | undefined,
    readonly contact: OrganizationContact[] | undefined,
    readonly contained: FhirResource[] | undefined,
    readonly endpoint: Reference[] | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly implicitRules: string | undefined,
    readonly language: string | undefined,
    readonly meta: Meta | undefined,
    readonly name: string | undefined,
    readonly partOf: Reference | undefined,
    readonly telecom: ContactPoint[] | undefined,
    readonly type: CodeableConcept[] | undefined
  ) {
    this.resourceType = 'Organization'
  }

  static createPrimarySponsor(
    primarySponsorOrganizationId: string,
    sponsorName: string,
    sponsorAddress: string,
    sponsorCity: string,
    sponsorPostalCode: string,
    sponsorCountry: string,
    contactFirstname: string,
    contactName: string,
    contactPhone: string,
    contactMail: string
  ): OrganizationModel {
    const emptyIfNullSponsorName = ModelUtils.emptyIfNull(sponsorName)
    const emptyIfNullSponsorAddress = ModelUtils.emptyIfNull(sponsorAddress)
    const emptyIfNullSponsorCity = ModelUtils.emptyIfNull(sponsorCity)
    const emptyIfNullSponsorPostalCode = ModelUtils.emptyIfNull(sponsorPostalCode)
    const emptyIfNullSponsorCountry = ModelUtils.emptyIfNull(sponsorCountry)
    const emptyIfNullContactFirstname = ModelUtils.emptyIfNull(contactFirstname)
    const emptyIfNullContactName = ModelUtils.emptyIfNull(contactName)
    const emptyIfNullContactPhone = ModelUtils.emptyIfNull(contactPhone)
    const emptyIfNullContactMail = ModelUtils.emptyIfNull(contactMail)

    return new OrganizationModel(
      true,
      [
        AddressModel.create(
          emptyIfNullSponsorAddress,
          emptyIfNullSponsorCity,
          emptyIfNullSponsorPostalCode,
          emptyIfNullSponsorCountry
        ),
      ],
      undefined,
      [
        OrganizationContactModel.create(
          emptyIfNullContactFirstname,
          emptyIfNullContactName,
          emptyIfNullContactPhone,
          emptyIfNullContactMail
        ),
      ],
      undefined,
      undefined,
      primarySponsorOrganizationId,
      undefined,
      undefined,
      undefined,
      undefined,
      emptyIfNullSponsorName,
      undefined,
      undefined,
      [CodeableConceptModel.createClinicalResearchSponsor()]
    )
  }
}
