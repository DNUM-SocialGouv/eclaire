import { CodeableConcept, Extension, Reference } from 'fhir/r4'

import { ReferenceModel } from './ReferenceModel'
import { ModelUtils } from '../../custom/ModelUtils'
import { CodeableConceptModel } from '../DataType/CodeableConceptModel'
import { ContactType } from '../MetadataType/ContactDetailModel'

export class ExtensionModel implements Extension {
  constructor(
    readonly id: string | undefined,
    readonly url: string,
    readonly valueCodeableConcept: CodeableConcept | undefined,
    readonly valueReference: Reference | undefined,
    readonly valueString: string | undefined
  ) {}

  static createEclaireSecondarySponsor(secondarySponsorId: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor',
      undefined,
      ReferenceModel.createSecondarySponsor(secondarySponsorId),
      undefined
    )
  }

  static createEclaireTherapeuticArea(therapeuticArea: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area',
      undefined,
      undefined,
      ModelUtils.emptyIfNull(therapeuticArea)
    )
  }

  static createEclaireContactType(contactType: ContactType): ExtensionModel {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition-eclaire-contact-type.html',
      CodeableConceptModel.createContactType(contactType),
      undefined,
      undefined
    )
  }
}
