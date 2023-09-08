import { Meta } from 'fhir/r4'

import { ModelUtils } from '../eclaire/ModelUtils'

export class MetaModel implements Meta {
  private constructor(
    readonly lastUpdated: string | undefined,
    readonly profile: string[] | undefined
  ) {}

  static create(history: string, approvalDate: string): Meta {
    const emptyHistoryDateIfNull = ModelUtils.undefinedIfNull(history)
    const emptyApprovalDateIfNull = ModelUtils.undefinedIfNull(approvalDate)

    return new MetaModel(
      ModelUtils.getMostRecentIsoDate(emptyHistoryDateIfNull, emptyApprovalDateIfNull),
      ['https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy']
    )
  }
}
