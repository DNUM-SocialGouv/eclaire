import {
  CodeableConcept,
  ContactDetail,
  FhirResource,
  Identifier,
  Meta,
  Narrative,
  Organization,
  Period,
  Reference,
  RelatedArtifact,
  ResearchStudy,
  ResearchStudyArm,
  ResearchStudyObjective,
} from 'fhir/r4'

export class ResearchStudyModel implements ResearchStudy {
  readonly resourceType: 'ResearchStudy'
  readonly status: ResearchStudyStatus

  constructor(
    readonly _referenceContents: ReferenceContents | undefined,
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
    riphStatus: RiphStatus,
    readonly text: Narrative | undefined,
    readonly title: string | undefined
  ) {
    this.resourceType = 'ResearchStudy'
    this.status = this.convertToResearchStudyStatus(riphStatus)
  }

  private convertToResearchStudyStatus(riphStatus: RiphStatus): ResearchStudyStatus {
    const fhirStatus = {
      ABANDONNEE: 'completed',
      ARCHIVEE: 'completed',
      A_DEMARRER: 'approved',
      EN_COURS: 'active',
      EXPIREE: 'approved',
      PROROGEE: 'approved',
      SUSPENDUE: 'temporarily-closed-to-accrual',
      TERMINEE: 'completed',
      TERMINEE_ANTICIPEE: 'administratively-completed',
    } satisfies { [key: string]: ResearchStudyStatus }

    return fhirStatus[riphStatus]
  }
}

export type RiphStatus = 'ABANDONNEE' | 'ARCHIVEE' | 'A_DEMARRER' | 'EN_COURS' | 'EXPIREE' | 'PROROGEE' | 'SUSPENDUE' | 'TERMINEE' | 'TERMINEE_ANTICIPEE'

export type ResearchStudyStatus = 'active'
  | 'administratively-completed'
  | 'approved'
  | 'closed-to-accrual'
  | 'closed-to-accrual-and-intervention'
  | 'completed'
  | 'disapproved'
  | 'in-review'
  | 'temporarily-closed-to-accrual'
  | 'temporarily-closed-to-accrual-and-intervention'
  | 'withdrawn'

export type ReferenceContents = {
  organizations: Organization[] | undefined
}
