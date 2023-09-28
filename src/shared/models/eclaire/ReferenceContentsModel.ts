import { Group, Location, Organization } from 'fhir/r4'

export class ReferenceContentsModel {
  private constructor(
    readonly enrollmentGroup: Group,
    readonly locations: Location[] | undefined,
    readonly organizations: Organization[] | undefined
  ) {}

  static create(
    enrollmentGroup: Group,
    locations: Location[],
    organizations: Organization[]
  ): ReferenceContentsModel {
    return new ReferenceContentsModel(
      enrollmentGroup,
      locations.length === 0 ? undefined : locations,
      organizations
    )
  }
}
