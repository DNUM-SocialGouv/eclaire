import {
  Address,
  CodeableConcept,
  ContactPoint,
  Identifier,
  Organization,
  OrganizationContact,
} from 'fhir/r4'

import { ContactPointModel } from '../data-types/ContactPointModel'
import { AssignerForPrimaryIdentifier } from '../special-purpose-data-types/ReferenceModel'
import { NarrativeModel } from './NarrativeModel'

export class OrganizationModel implements Organization {
  readonly resourceType: 'Organization'

  private constructor(
    readonly address: Address[] | undefined,
    readonly contact: OrganizationContact[] | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly name: string | undefined,
    readonly telecom: ContactPoint[] | undefined,
    readonly type: CodeableConcept[] | undefined,
    readonly text: NarrativeModel
  ) {
    this.resourceType = 'Organization'
  }

  static createPrimaryAssigner(assignerForPrimaryIdentifier: AssignerForPrimaryIdentifier, text: NarrativeModel): Organization {
    let name: string = undefined
    let url: string = undefined

    switch (assignerForPrimaryIdentifier) {
      case AssignerForPrimaryIdentifier.ANSM:
        name = 'Agence nationale de sécurité du médicament et des produits de santé'
        url = 'https://ansm.sante.fr'
        break
      case AssignerForPrimaryIdentifier.CTIS:
        name = 'Clinical Trials Information System'
        url = 'https://euclinicaltrials.eu/'
        break
      case AssignerForPrimaryIdentifier.EUDRACT:
        name = 'European Union Drug Regulating Authorities Clinical Trials Database'
        url = 'https://eudract.ema.europa.eu/'
        break
      default:
    }

    return new OrganizationModel(
      undefined,
      undefined,
      assignerForPrimaryIdentifier,
      undefined,
      name,
      [ContactPointModel.createUrl(url)],
      undefined,
      text
    )
  }
}
