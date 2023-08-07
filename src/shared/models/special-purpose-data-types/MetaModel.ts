import { Meta } from 'fhir/r4'

import { ModelUtils } from '../eclaire/ModelUtils'

export class MetaModel implements Meta {
  constructor(
    readonly lastUpdated: string | undefined,
    readonly profile: string[] | undefined
  ) {}

  static create(
    history: string,
    approvalDate: string
  ): MetaModel {
    const emptyHistoryDateIfNull = ModelUtils.emptyIfNull(history)
    const emptyApprovalDateIfNull = ModelUtils.emptyIfNull(approvalDate)

    return new MetaModel(
      ModelUtils.getMostRecentIsoDate(emptyHistoryDateIfNull, emptyApprovalDateIfNull),
      ['https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy']
    )
  }
}
