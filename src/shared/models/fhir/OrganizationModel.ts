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
import { AssignerForSecondaryIdentifier, ReferenceModel } from './SpecialPurposeDataType/ReferenceModel'
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

  static createSponsor(
    sponsorOrganizationId: string,
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
      sponsorOrganizationId,
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

  static createSecondaryAssigner(assignerForSecondaryIdentifier: AssignerForSecondaryIdentifier) {
    let name: string
    let endpoint: Reference

    if (assignerForSecondaryIdentifier === AssignerForSecondaryIdentifier.ANSM) {
      name = 'Agence nationale de sécurité du médicament et des produits de santé'
      endpoint = ReferenceModel.createUrl('https://ansm.sante.fr')
    } else if (assignerForSecondaryIdentifier === AssignerForSecondaryIdentifier.CTIS) {
      name = 'Clinical Trials Information System'
      endpoint = ReferenceModel.createUrl('https://euclinicaltrials.eu/')
    } else if (assignerForSecondaryIdentifier === AssignerForSecondaryIdentifier.EUDRACT) {
      name = 'European Union Drug Regulating Authorities Clinical Trials Database'
      endpoint = ReferenceModel.createUrl('https://eudract.ema.europa.eu/')
    } else {
      name = undefined
      endpoint = undefined
    }

    return new OrganizationModel(
      true,
      undefined,
      [assignerForSecondaryIdentifier],
      undefined,
      undefined,
      [endpoint],
      assignerForSecondaryIdentifier,
      undefined,
      undefined,
      undefined,
      undefined,
      name,
      undefined,
      undefined,
      undefined
    )
  }
}
