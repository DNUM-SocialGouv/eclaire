import { Meta } from 'fhir/r4'

export class MetaModel implements Meta {
  private constructor(
    readonly lastUpdated: string | undefined,
    readonly profile: string[] | undefined
  ) {}

  static create(mostRecentDate: string): Meta {
    return new MetaModel(
      mostRecentDate,
      ['https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy']
    )
  }
}
