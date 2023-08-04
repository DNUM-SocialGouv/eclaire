import { Identifier, Reference } from 'fhir/r4'

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
      'Reference to primary assigner',
      undefined,
      undefined,
      undefined,
      'Organization'
    )
  }

  static createAssignerForSecondaryIdentifier(assigner: AssignerForSecondaryIdentifier): ReferenceModel {
    const type = 'Organization'
    return new ReferenceModel(
      'Reference to secondary assigner',
      undefined,
      undefined,
      this.generateRelativeUrlReference(assigner, type),
      type
    )
  }

  static createPrimarySponsor(primarySponsorOrganizationId: string): ReferenceModel {
    const type = 'Organization'
    return new ReferenceModel(
      'Reference to primary sponsor',
      undefined,
      undefined,
      this.generateRelativeUrlReference(primarySponsorOrganizationId, type),
      type
    )
  }

  static createSecondarySponsor(secondarySponsorOrganizationId: string): ReferenceModel {
    const type = 'Organization'
    return new ReferenceModel(
      'Reference to secondary sponsor',
      undefined,
      undefined,
      this.generateRelativeUrlReference(secondarySponsorOrganizationId, type),
      type
    )
  }

  static createSite(id: string): ReferenceModel {
    const type = 'Location'
    return new ReferenceModel(
      'Reference to site',
      undefined,
      undefined,
      this.generateRelativeUrlReference(id, type),
      type
    )
  }

  private static generateRelativeUrlReference(id: string, type: string): string {
    return `${type}/${id}`
  }

  private static generateInternalFragmentReference(id: string): string {
    return `#${id}`
  }
}

export enum AssignerForSecondaryIdentifier {
  ANSM = 'ansm',
  CTIS = 'ctis',
  EUDRACT = 'eudract'
}
