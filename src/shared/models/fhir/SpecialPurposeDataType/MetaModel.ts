import { Coding, Meta } from 'fhir/r4'

import { ModelUtils } from '../../custom/ModelUtils'

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

  static create(
    history: string,
    approvalDate: string
  ): MetaModel {
    const emptyHistoryDateIfNull = ModelUtils.emptyIfNull(history)
    const emptyApprovalDateIfNull = ModelUtils.emptyIfNull(approvalDate)

    return new MetaModel(
      undefined,
      ModelUtils.getMostRecentIsoDate(emptyHistoryDateIfNull, emptyApprovalDateIfNull),
      ['https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy'],
      undefined,
      undefined,
      undefined,
      undefined
    )
  }
}
