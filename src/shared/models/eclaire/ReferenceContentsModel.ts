import { Location, Organization } from 'fhir/r4'

export class ReferenceContentsModel {
  private constructor(
    readonly locations: Location[] | undefined,
    readonly organizations: Organization[] | undefined
  ) {}

  static create(locations: Location[], organizations: Organization[]): ReferenceContentsModel {
    return new ReferenceContentsModel(
      locations.length === 0 ? undefined : locations,
      organizations
    )
  }
}
