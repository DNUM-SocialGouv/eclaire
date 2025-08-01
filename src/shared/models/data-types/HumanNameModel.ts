import { HumanName } from 'fhir/r4'

export class HumanNameModel implements HumanName {
  private constructor(
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

  static create(firstname: string, middleName: string, name: string, title: string): HumanName {
    const prefix = title && title.length > 0 ? [title] : undefined
    const given: string[] = []
    if (firstname) given.push(firstname)
    if (middleName) given.push(middleName)

    return new HumanNameModel(
      name,
      given,
      prefix,
      'official'
    )
  }
}
