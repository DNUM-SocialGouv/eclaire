import { Address, CodeableConcept, Duration, Extension, HumanName, Period, Reference } from 'fhir/r4'

import { AddressModel } from '../data-types/AddressModel'
import { CodeableConceptModel } from '../data-types/CodeableConceptModel'
import { HumanNameModel } from '../data-types/HumanNameModel'
import { PeriodModel } from '../data-types/PeriodModel'
import { ContactType } from '../metadata-types/ContactDetailModel'
import { DurationModel } from '../quantity/DurationModel'

export class ExtensionModel implements Extension {
  private constructor(
    readonly extension: Extension[] | undefined,
    readonly url: string,
    readonly valueAddress: Address | undefined,
    readonly valueCodeableConcept: CodeableConcept | undefined,
    readonly valueDuration: Duration | undefined,
    readonly valueHumanName: HumanName | undefined,
    readonly valueInstant: string | undefined,
    readonly valueMarkdown: string | undefined,
    readonly valuePeriod: Period | undefined,
    readonly valueReference: Reference | undefined,
    readonly valueString: string | undefined
  ) {}

  static createEclaireApprovalDate(instant: string) {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-approval-date',
      undefined,
      undefined,
      undefined,
      undefined,
      instant,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireAssociatedPartyR5(name: string, role: string, period: string, classifier: string, party: Reference): Extension {
    return new ExtensionModel(
      [
        this.createEclaireAssociatedPartyR5Name(name),
        this.createEclaireAssociatedPartyR5Role(role),
        this.createEclaireAssociatedPartyR5Period(period),
        this.createEclaireAssociatedPartyR5Classifier(classifier),
        this.createEclaireAssociatedPartyR5Party(party),
      ],
      'http://hl7.org/fhir/5.0/StructureDefinition/extension-ResearchStudy.associatedParty',
      undefined,
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
      undefined,
      undefined
    )
  }

  static createEclaireRecruitmentPeriod(start: string, end: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-recruitment-period',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      PeriodModel.createRecruitmentPeriod(start, end),
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
      undefined,
      descriptionSummaryInMarkdown,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireOutcomeMeasure(name: string, type: CodeableConcept, markdownDescription: string, reference: Reference): Extension {
    return new ExtensionModel(
      [
        this.createEclaireOutcomeMeasureName(name),
        this.createEclaireOutcomeMeasureType(type),
        this.createEclaireOutcomeMeasureDescription(markdownDescription),
        this.createEclaireOutcomeMeasureReference(reference),
      ],
      'https://hl7.org/fhir/R5/researchstudy-definitions.html#ResearchStudy.outcomeMeasure',
      undefined,
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

  static createEclaireParticipationDuration(duration: number): Extension {
    return new ExtensionModel(
      undefined,
      'not-existing-yet',
      undefined,
      undefined,
      DurationModel.create(duration),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireTreatment(treatment: string): Extension {
    const treatmentCode: CodeableConcept = undefined
    const keyword: string = undefined

    return new ExtensionModel(
      undefined,
      'not-existing-yet',
      undefined,
      treatmentCode,
      undefined,
      undefined,
      undefined,
      keyword,
      undefined,
      undefined,
      treatment
    )
  }

  static createEclaireRecruitmentStatus(status: string): Extension {
    return new ExtensionModel(
      undefined,
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-recruitment-status',
      undefined,
      CodeableConceptModel.createRecruitmentStatus(status),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  static createEclaireArmIntervention(name: string, description: string): ExtensionModel {
    return new ExtensionModel(
      [
        ExtensionModel.createEclaireArmInterventionName(name),
        ExtensionModel.createEclaireArmInterventionDescription(description),
      ],
      'https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-arm-intervention',
      undefined,
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

  private static createEclaireArmInterventionName(name: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
      'name',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      name
    )
  }

  private static createEclaireArmInterventionDescription(description: string): ExtensionModel {
    return new ExtensionModel(
      undefined,
      'description',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      description
    )
  }

  private static createEclaireAssociatedPartyR5Name(name: string): Extension {
    return new ExtensionModel(
      undefined,
      'name',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      name
    )
  }

  private static createEclaireAssociatedPartyR5Role(role: string): Extension {
    return new ExtensionModel(
      undefined,
      'role',
      undefined,
      CodeableConceptModel.createEclaireAssociatedPartyR5Role(role),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  private static createEclaireAssociatedPartyR5Period(period: string) {
    return new ExtensionModel(
      undefined,
      'period',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      PeriodModel.createEclaireAssociatedPartyR5Period(period),
      undefined,
      undefined
    )
  }

  private static createEclaireAssociatedPartyR5Classifier(classifier: string) {
    return new ExtensionModel(
      undefined,
      'classifier',
      undefined,
      CodeableConceptModel.createEclaireAssociatedPartyR5Classifier(classifier),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  private static createEclaireAssociatedPartyR5Party(reference: Reference) {
    return new ExtensionModel(
      undefined,
      'party',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      reference,
      undefined
    )
  }

  private static createEclaireOutcomeMeasureName(name: string) {
    return new ExtensionModel(
      undefined,
      'name',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      name
    )
  }

  private static createEclaireOutcomeMeasureType(type: CodeableConcept) {
    return new ExtensionModel(
      undefined,
      'type',
      undefined,
      type,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )
  }

  private static createEclaireOutcomeMeasureDescription(markdownDescription: string) {
    return new ExtensionModel(
      undefined,
      'description',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      markdownDescription,
      undefined,
      undefined,
      undefined
    )
  }

  private static createEclaireOutcomeMeasureReference(reference: Reference) {
    return new ExtensionModel(
      undefined,
      'reference',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      reference,
      undefined
    )
  }
}

export type LabelType = 'primary' | 'official' | 'plain-language' | 'subtitle' | 'short-title' | 'acronym' | 'earlier-title' | 'language' | 'auto-translated' | 'human-use' | 'machine-use'
