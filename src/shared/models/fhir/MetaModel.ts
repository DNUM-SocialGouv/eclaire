import { Coding, Meta } from 'fhir/r4'

export class MetaModel implements Meta {
  constructor(
    readonly id: string | undefined,
    readonly lastUpdated: string | undefined,
    readonly profile: string[] | undefined,
    readonly security: Coding[] | undefined,
    readonly source: string | undefined,
    readonly tag: Coding[] | undefined,
    readonly versionId: string | undefined
  ) {}
}
