import {
  Address,
  CodeableConcept,
  ContactPoint,
  Identifier,
  Organization,
  OrganizationContact,
} from 'fhir/r4'

import { OrganizationContactModel } from '../backbone-elements/OrganizationContactModel'
import { AddressModel } from '../data-types/AddressModel'
import { CodeableConceptModel } from '../data-types/CodeableConceptModel'
import { ContactPointModel } from '../data-types/ContactPointModel'
import { ModelUtils } from '../eclaire/ModelUtils'
import { AssignerForSecondaryIdentifier } from '../special-purpose-data-types/ReferenceModel'

export class OrganizationModel implements Organization {
  readonly resourceType: 'Organization'

  constructor(
    readonly address: Address[] | undefined,
    readonly contact: OrganizationContact[] | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly name: string | undefined,
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
  ): Organization {
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
      [
        AddressModel.create(
          [emptyIfNullSponsorAddress],
          emptyIfNullSponsorCity,
          emptyIfNullSponsorPostalCode,
          emptyIfNullSponsorCountry
        ),
      ],
      [
        OrganizationContactModel.create(
          emptyIfNullContactFirstname,
          emptyIfNullContactName,
          emptyIfNullContactPhone,
          emptyIfNullContactMail
        ),
      ],
      sponsorOrganizationId,
      undefined,
      emptyIfNullSponsorName,
      undefined,
      [CodeableConceptModel.createClinicalResearchSponsor()]
    )
  }

  static createSecondaryAssigner(assignerForSecondaryIdentifier: AssignerForSecondaryIdentifier): Organization {
    let name: string
    let url: string

    switch (assignerForSecondaryIdentifier) {
      case AssignerForSecondaryIdentifier.ANSM:
        name = 'Agence nationale de sécurité du médicament et des produits de santé'
        url = 'https://ansm.sante.fr'
        break
      case AssignerForSecondaryIdentifier.CTIS:
        name = 'Clinical Trials Information System'
        url = 'https://euclinicaltrials.eu/'
        break
      case AssignerForSecondaryIdentifier.EUDRACT:
        name = 'European Union Drug Regulating Authorities Clinical Trials Database'
        url = 'https://eudract.ema.europa.eu/'
        break
      default:
        name = undefined
        url = undefined
    }

    return new OrganizationModel(
      undefined,
      undefined,
      assignerForSecondaryIdentifier,
      undefined,
      name,
      [ContactPointModel.createUrl(url)],
      undefined
    )
  }
}
