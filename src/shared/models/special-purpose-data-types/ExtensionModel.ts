import { CodeableConcept, Extension, HumanName, Period, Reference } from 'fhir/r4'

import { ReferenceModel } from './ReferenceModel'
import { CodeableConceptModel } from '../data-types/CodeableConceptModel'
import { HumanNameModel } from '../data-types/HumanNameModel'
import { PeriodModel } from '../data-types/PeriodModel'
import { ModelUtils } from '../eclaire/ModelUtils'
import { ContactType } from '../metadata-types/ContactDetailModel'

export class ExtensionModel implements Extension {
  private constructor(
    readonly extension: Extension[] | undefined,
    readonly url: string,
    readonly valueCodeableConcept: CodeableConcept | undefined,
    readonly valueHumanName: HumanName | undefined,
    readonly valueInstant: string | undefined,
    readonly valuePeriod: Period | undefined,
    readonly valueReference: Reference | undefined,
    readonly valueString: string | undefined
  ) {}

  static createEclaireSecondarySponsor(secondarySponsorId: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor',
      undefined,
      undefined,
      undefined,
      undefined,
      ReferenceModel.createSecondarySponsor(secondarySponsorId),
      undefined
    )
  }

  static createEclaireTherapeuticArea(therapeuticArea: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      therapeuticArea
    )
  }

  static createEclaireContactType(contactType: ContactType): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type',
      CodeableConceptModel.createContactType(contactType),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireLabel(value: string, type: LabelType): Extension {
    return new ExtensionModel(
      [this.createEclaireLabelValue(value), this.createEclaireLabelType(type)],
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireLabelValue(value: string): Extension {
    return new ExtensionModel(
      undefined,
      'labelValue',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      value
    )
  }

  static createEclaireLabelType(type: LabelType): Extension {
    return new ExtensionModel(
      undefined,
      'labelType',
      CodeableConceptModel.createLabelType(type),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireRecruitmentPeriod(recruitmentDate: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-recruitment-period',
      undefined,
      undefined,
      undefined,
      PeriodModel.createRecruitmentPeriod(recruitmentDate),
      undefined,
      undefined
    )
  }

  static createEclaireSiteContactName(firstname: string, name: string, title: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-site-contact-name',
      undefined,
      HumanNameModel.create(firstname, name, title),
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireReviewDate(history: string, approvalDate: string): Extension {
    const emptyHistoryDateIfNull = ModelUtils.undefinedIfNull(history)
    const emptyApprovalDateIfNull = ModelUtils.undefinedIfNull(approvalDate)

    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date',
      undefined,
      undefined,
      ModelUtils.getMostRecentIsoDate(emptyHistoryDateIfNull, emptyApprovalDateIfNull),
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireContactName(firstname: string, name: string): Extension {
    return new ExtensionModel(
      undefined,
      undefined,
      undefined,
      HumanNameModel.create(firstname, name),
      undefined,
      undefined,
      undefined,
      undefined
    )
  }
}

export type LabelType = 'primary' | 'official' | 'plain-language' | 'subtitle' | 'short-title' | 'acronym' | 'earlier-title' | 'language' | 'auto-translated' | 'human-use' | 'machine-use'
