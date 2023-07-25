import { Identifier, Reference } from 'fhir/r4'

import { ModelUtils } from '../../custom/ModelUtils'

export class ReferenceModel implements Reference {
  constructor(
    readonly display: string | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier | undefined,
    readonly reference: string | undefined,
    readonly type: string | undefined
  ) {}

  static createGroupDetailingStudyCharacteristics(enrollmentGroupId: string): ReferenceModel {
    return new ReferenceModel(
      'Reference to group detailing study characteristics',
      undefined,
      undefined,
      this.generateInternalFragmentReference(enrollmentGroupId),
      'Group'
    )
  }

  static createAssignerForPrimaryIdentifier(): ReferenceModel {
    return new ReferenceModel(
      ModelUtils.UNAVAILABLE,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createCtisAssigner(ctisNumber: string): ReferenceModel {
    return new ReferenceModel(
      'euclinicaltrials.eu',
      undefined,
      undefined,
      `https://euclinicaltrials.eu/app/#/view/${ctisNumber}`,
      undefined
    )
  }

  static createAnsmAssigner(): ReferenceModel {
    return new ReferenceModel(
      'Agence nationale de sécurité du médicament et des produits de santé (ANSM)',
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEudraCtAssigner(): ReferenceModel {
    return new ReferenceModel(
      'European Union Drug Regulating Authorities Clinical Trials Database (Eudra CT)',
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createPrimarySponsor(primarySponsorOrganizationId: string): ReferenceModel {
    return new ReferenceModel(
      'Reference to primary sponsor',
      undefined,
      undefined,
      this.generateRelativeUrlReference(primarySponsorOrganizationId, 'Organization'),
      'Organization'
    )
  }

  static createSecondarySponsor(secondarySponsorOrganizationId: string) {
    return new ReferenceModel(
      'Reference to secondary sponsor',
      undefined,
      undefined,
      this.generateRelativeUrlReference(secondarySponsorOrganizationId, 'Organization'),
      'Organization'
    )
  }

  private static generateRelativeUrlReference(id: string, type: string): string {
    return `${type}/${id}`
  }

  private static generateInternalFragmentReference(id: string): string {
    return `#${id}`
  }
}
