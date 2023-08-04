import { CodeableConcept, Extension, HumanName, Period, Reference } from 'fhir/r4'

import { ReferenceModel } from './ReferenceModel'
import { ModelUtils } from '../../custom/ModelUtils'
import { CodeableConceptModel } from '../DataType/CodeableConceptModel'
import { HumanNameModel } from '../DataType/HumanNameModel'
import { PeriodModel } from '../DataType/PeriodModel'
import { ContactType } from '../MetadataType/ContactDetailModel'

export class ExtensionModel implements Extension {
  constructor(
    readonly extension: Extension[] | undefined,
    readonly id: string | undefined,
    readonly url: string,
    readonly valueCodeableConcept: CodeableConcept | undefined,
    readonly valueHumanName: HumanName | undefined,
    readonly valueInstant: string | undefined,
    readonly valuePeriod: Period | undefined,
    readonly valueReference: Reference | undefined,
    readonly valueString: string | undefined
  ) {}

  static createEclaireSecondarySponsor(secondarySponsorId: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
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

  static createEclaireTherapeuticArea(therapeuticArea: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      ModelUtils.emptyIfNull(therapeuticArea)
    )
  }

  static createEclaireContactType(contactType: ContactType): ExtensionModel {
    return new ExtensionModel(
      undefined,
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

  static createEclaireLabel(value: string, type: LabelType): ExtensionModel {
    return new ExtensionModel(
      [this.createEclaireLabelValue(value), this.createEclaireLabelType(type)],
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireLabelValue(value: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
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

  static createEclaireLabelType(type: LabelType): ExtensionModel {
    return new ExtensionModel(
      undefined,
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

  static createEclaireRecruitmentPeriod(recruitmentDate: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
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

  static createEclaireSiteContactName(firstname: string, name: string, title: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
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

  static createEclaireReviewDate(history: string, approvalDate: string): ExtensionModel {
    const emptyHistoryDateIfNull = ModelUtils.emptyIfNull(history)
    const emptyApprovalDateIfNull = ModelUtils.emptyIfNull(approvalDate)

    return new ExtensionModel(
      undefined,
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
}

export type LabelType = 'primary' | 'official' | 'plain-language' | 'subtitle' | 'short-title' | 'acronym' | 'earlier-title' | 'language' | 'auto-translated' | 'human-use' | 'machine-use'
