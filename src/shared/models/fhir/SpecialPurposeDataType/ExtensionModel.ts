import { Extension, Reference } from 'fhir/r4'

import { ReferenceModel } from './ReferenceModel'

export class ExtensionModel implements Extension {
  constructor(
    readonly id: string | undefined,
    readonly url: string,
    readonly valueReference: Reference | undefined
  ) {}

  static createEclaireSecondarySponsor(secondarySponsorId: string) {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor',
      ReferenceModel.createSecondarySponsor(secondarySponsorId)
    )
  }
}
