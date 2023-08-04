import { Location, Organization } from 'fhir/r4'

export class ReferenceContentsModel {
  constructor(
    readonly locations: Location[] | undefined,
    readonly organizations: Organization[] | undefined
  ) {}

  static create(
    locations: Location[],
    organizations: Organization[]
  ): ReferenceContentsModel {
    return new ReferenceContentsModel(
      locations,
      organizations
    )
  }
}
