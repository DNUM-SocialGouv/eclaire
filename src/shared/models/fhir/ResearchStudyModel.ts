import {
  CodeableConcept,
  ContactDetail, Extension,
  FhirResource,
  Identifier,
  Meta,
  Reference,
  ResearchStudy,
} from 'fhir/r4'

import { ReferenceContentsModel } from '../custom/ReferenceContentsModel'

export class ResearchStudyModel implements ResearchStudy {
  readonly resourceType: 'ResearchStudy'
  readonly status: ResearchStudyStatus

  constructor(
    readonly category: CodeableConcept[] | undefined,
    readonly condition: CodeableConcept[] | undefined,
    readonly contact: ContactDetail[] | undefined,
    readonly contained: FhirResource[] | undefined,
    readonly description: string | undefined,
    readonly enrollment: Reference[] | undefined,
    readonly extension: Extension[] | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly location: CodeableConcept[] | undefined,
    readonly meta: Meta | undefined,
    readonly phase: CodeableConcept | undefined,
    readonly referenceContents: ReferenceContentsModel,
    readonly site: Reference[] | undefined,
    readonly sponsor: Reference | undefined,
    riphStatus: RiphStatus,
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

type ResearchStudyStatus = 'active'
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
