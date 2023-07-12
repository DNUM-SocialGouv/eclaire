import { Identifier, Reference } from 'fhir/r4'

export class ReferenceModel implements Reference {
  constructor(
    readonly display: string | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier | undefined,
    readonly reference: string | undefined,
    readonly type: string | undefined
  ) {}

  static createCtisReferenceModel(numero_ctis: string): ReferenceModel {
    return new ReferenceModel(
      'euclinicaltrials.eu',
      undefined,
      undefined,
      `https://euclinicaltrials.eu/app/#/view/${numero_ctis}`,
      undefined
    )
  }

  static createGroupDetailingStudyCharacteristics(enrollmentGroupId: string | undefined) {
    return new ReferenceModel(
      'Reference to group detailing study characteristics',
      undefined,
      undefined,
      '#' + enrollmentGroupId,
      'Group'
    )
  }
}
