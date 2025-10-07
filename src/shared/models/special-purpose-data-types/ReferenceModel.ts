import { Reference } from 'fhir/r4'

export class ReferenceModel implements Reference {
  private constructor(
    readonly display: string | undefined,
    readonly reference: string | undefined,
    readonly type: string | undefined
  ) {}

  static createGroupDetailingStudyCharacteristics(enrollmentGroupId: string): Reference {
    const type = 'Group'
    return new ReferenceModel(
      'Reference to group detailing study characteristics',
      this.generateRelativeUrlReference(enrollmentGroupId, type),
      type
    )
  }

  static createAssignerForPrimaryIdentifier(assigner: AssignerForPrimaryIdentifier): Reference {
    const type = 'Organization'
    return new ReferenceModel(
      'Reference to primary assigner',
      this.generateRelativeUrlReference(assigner, type),
      type
    )
  }

  static createAssignerForSecondaryIdentifier(assigner: AssignerForPrimaryIdentifier): Reference {
    const type = 'Organization'
    return new ReferenceModel(
      'Reference to secondary assigner',
      this.generateRelativeUrlReference(assigner, type),
      type
    )
  }

  static createPrimarySponsor(primarySponsorOrganizationId: string): Reference {
    const type = 'Organization'
    return new ReferenceModel(
      'Reference to primary sponsor',
      this.generateRelativeUrlReference(primarySponsorOrganizationId, type),
      type
    )
  }

  static createSecondarySponsor(secondarySponsorOrganizationId: string): Reference {
    const type = 'Organization'
    return new ReferenceModel(
      'Reference to secondary sponsor',
      this.generateRelativeUrlReference(secondarySponsorOrganizationId, type),
      type
    )
  }

  static createSite(id: string): Reference {
    const type = 'Location'
    return new ReferenceModel(
      'Reference to site',
      this.generateRelativeUrlReference(id, type),
      type
    )
  }

  private static generateRelativeUrlReference(id: string, type: string): string {
    return `${type}/${id}`
  }
}

export enum AssignerForPrimaryIdentifier {
  ANSM = 'ansm',
  CTIS = 'ctis',
  EUDRACT = 'eudract'
}
