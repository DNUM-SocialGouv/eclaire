import { HumanName, Period } from 'fhir/r4'

export class HumanNameModel implements HumanName {
  constructor(
    readonly family: string | undefined,
    readonly given: string[] | undefined,
    readonly id: string | undefined,
    readonly period: Period | undefined,
    readonly prefix: string[] | undefined,
    readonly suffix: string[] | undefined,
    readonly text: string | undefined,
    readonly use:
      | 'anonymous'
      | 'maiden'
      | 'nickname'
      | 'official'
      | 'old'
      | 'temp'
      | 'usual'
      | undefined
  ) {}

  static create(firstname: string, name: string) {
    return new HumanNameModel(
      name,
      [firstname],
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      'official'
    )
  }
}
