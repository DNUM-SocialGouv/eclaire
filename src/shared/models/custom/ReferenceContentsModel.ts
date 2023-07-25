import { Organization } from 'fhir/r4'

export class ReferenceContentsModel {
  constructor(
    readonly organizations: Organization[] | undefined
  ) {}
  static create(organizations: Organization[]): ReferenceContentsModel {
    return new ReferenceContentsModel(
      organizations
    )
  }
}
