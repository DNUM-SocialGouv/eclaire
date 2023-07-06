import {
  CodeableConcept,
  ContactDetail,
  FhirResource,
  Identifier,
  Meta,
  Narrative,
  Period,
  Reference,
  RelatedArtifact,
  ResearchStudy,
  ResearchStudyArm,
  ResearchStudyObjective,
} from 'fhir/r4'

export class ResearchStudyModel implements ResearchStudy {
  readonly resourceType: 'ResearchStudy'
  constructor(
    readonly arm: ResearchStudyArm[] | undefined,
    readonly category: CodeableConcept[] | undefined,
    readonly condition: CodeableConcept[] | undefined,
    readonly contact: ContactDetail[] | undefined,
    readonly contained: FhirResource[] | undefined,
    readonly description: string | undefined,
    readonly enrollment: Reference[] | undefined,
    readonly focus: CodeableConcept[] | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly implicitRules: string | undefined,
    readonly keyword: CodeableConcept[] | undefined,
    readonly language: string | undefined,
    readonly location: CodeableConcept[] | undefined,
    readonly meta: Meta | undefined,
    readonly objective: ResearchStudyObjective[] | undefined,
    readonly partOf: Reference[] | undefined,
    readonly period: Period | undefined,
    readonly phase: CodeableConcept | undefined,
    readonly primaryPurposeType: CodeableConcept | undefined,
    readonly principalInvestigator: Reference | undefined,
    readonly protocol: Reference[] | undefined,
    readonly reasonStopped: CodeableConcept | undefined,
    readonly relatedArtifact: RelatedArtifact[] | undefined,
    readonly site: Reference[] | undefined,
    readonly sponsor: Reference | undefined,
    readonly status:
      | 'active'
      | 'administratively-completed'
      | 'approved'
      | 'closed-to-accrual'
      | 'closed-to-accrual-and-intervention'
      | 'completed'
      | 'disapproved'
      | 'in-review'
      | 'temporarily-closed-to-accrual'
      | 'temporarily-closed-to-accrual-and-intervention'
      | 'withdrawn',
    readonly text: Narrative | undefined,
    readonly title: string | undefined
  ) {}
}
