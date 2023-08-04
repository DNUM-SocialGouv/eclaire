import { HumanName } from 'fhir/r4'

export class HumanNameModel implements HumanName {
  constructor(
    readonly family: string | undefined,
    readonly given: string[] | undefined,
    readonly prefix: string[] | undefined,
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

  static create(firstname: string, name: string, title?: string) {
    let prefix: string[] = undefined
    if (title !== undefined) prefix = [title]

    return new HumanNameModel(
      name,
      [firstname],
      prefix,
      'official'
    )
  }
}
