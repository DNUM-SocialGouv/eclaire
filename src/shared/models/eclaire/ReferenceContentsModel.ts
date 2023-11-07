import { Group, Location, Organization } from 'fhir/r4'

import { OriginalLanguageContentModel } from './OriginalLanguageContentModel'

export class ReferenceContentsModel {
  private constructor(
    readonly enrollmentGroup: Group,
    readonly locations: Location[] | undefined,
    readonly organizations: Organization[] | undefined,
    readonly originalLanguageContent: OriginalLanguageContentModel | undefined
  ) {}

  static create(
    enrollmentGroup: Group,
    locations: Location[],
    organizations: Organization[],
    diseaseCondition: string,
    therapeuticArea: string,
    title: string
  ): ReferenceContentsModel {
    return new ReferenceContentsModel(
      enrollmentGroup,
      locations.length === 0 ? undefined : locations,
      organizations,
      OriginalLanguageContentModel.create(
        diseaseCondition,
        therapeuticArea,
        title
      )
    )
  }
}
