import { Identifier, Reference } from 'fhir/r4'

export class ReferenceModel implements Reference {
  constructor(
    readonly display: string | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier | undefined,
    readonly reference: string | undefined,
    readonly type: string | undefined
  ) {}

  static createCtisReferenceModel(ctisNumber: string): ReferenceModel {
    return new ReferenceModel(
      'euclinicaltrials.eu',
      undefined,
      undefined,
      `https://euclinicaltrials.eu/app/#/view/${ctisNumber}`,
      undefined
    )
  }

  static createGroupDetailingStudyCharacteristics(enrollmentGroupId: string): ReferenceModel {
    return new ReferenceModel(
      'Reference to group detailing study characteristics',
      undefined,
      undefined,
      '#' + enrollmentGroupId,
      'Group'
    )
  }
}
