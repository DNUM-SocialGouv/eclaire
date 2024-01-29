import { Address, CodeableConcept, Extension, HumanName, Period, Reference } from 'fhir/r4'

import { ReferenceModel } from './ReferenceModel'
import { AddressModel } from '../data-types/AddressModel'
import { CodeableConceptModel } from '../data-types/CodeableConceptModel'
import { HumanNameModel } from '../data-types/HumanNameModel'
import { PeriodModel } from '../data-types/PeriodModel'
import { ContactType } from '../metadata-types/ContactDetailModel'

export class ExtensionModel implements Extension {
  private constructor(
    readonly extension: Extension[] | undefined,
    readonly url: string,
    readonly valueAddress: Address | undefined,
    readonly valueCodeableConcept: CodeableConcept | undefined,
    readonly valueHumanName: HumanName | undefined,
    readonly valueInstant: string | undefined,
    readonly valueMarkdown: string | undefined,
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
      undefined,
      undefined,
      therapeuticArea
    )
  }

  static createEclaireContactType(contactType: ContactType): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type',
      undefined,
      CodeableConceptModel.createContactType(contactType),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireLabel(value: string, type: LabelType): Extension {
    return new ExtensionModel(
      [this.createEclaireLabelR5Value(value), this.createEclaireLabelR5Type(type)],
      'http://hl7.org/fhir/5.0/StructureDefinition/extension-ResearchStudy.label',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireLabelR5Value(value: string): Extension {
    return new ExtensionModel(
      undefined,
      'value',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      value
    )
  }

  static createEclaireLabelR5Type(type: LabelType): Extension {
    return new ExtensionModel(
      undefined,
      'type',
      undefined,
      CodeableConceptModel.createLabelType(type),
      undefined,
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
      undefined,
      HumanNameModel.create(firstname, undefined, name, title),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireReviewDate(mostRecentDate: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date',
      undefined,
      undefined,
      undefined,
      mostRecentDate,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireContactName(firstname: string, middleName: string, name: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-name',
      undefined,
      undefined,
      HumanNameModel.create(firstname, middleName, name, undefined),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireContactAddress(address: string, city: string, country: string, zip: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-address',
      AddressModel.create([address], city, zip, country),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireContactAffiliation(affiliation: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-affiliation',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      affiliation
    )
  }

  static createEclaireDescriptionSummary(descriptionSummaryInMarkdown: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://hl7.org/fhir/R5/researchstudy-definitions.html#ResearchStudy.descriptionSummary',
      undefined,
      undefined,
      undefined,
      undefined,
      descriptionSummaryInMarkdown,
      undefined,
      undefined,
      undefined
    )
  }
}

export type LabelType = 'primary' | 'official' | 'plain-language' | 'subtitle' | 'short-title' | 'acronym' | 'earlier-title' | 'language' | 'auto-translated' | 'human-use' | 'machine-use'
