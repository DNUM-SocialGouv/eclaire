import {
  CodeableConcept,
  ContactDetail,
  Extension,
  Identifier,
  Meta, Narrative, Period,
  Reference, RelatedArtifact,
  ResearchStudy, ResearchStudyArm,
} from 'fhir/r4'

import { OriginalContentsToEnhanceModel } from '../eclaire/OriginalContentsToEnhanceModel'
import { ReferenceContentsModel } from '../eclaire/ReferenceContentsModel'
import { TranslatedContentModel } from '../eclaire/TranslatedContentModel'

export class ResearchStudyModel implements ResearchStudy {
  readonly resourceType: 'ResearchStudy'
  readonly status: ResearchStudyStatus
  translatedContent?: TranslatedContentModel = undefined
  originalContentsToEnhance: OriginalContentsToEnhanceModel | undefined

  constructor(
    readonly arm: ResearchStudyArm[] | undefined,
    readonly category: CodeableConcept[] | undefined,
    readonly condition: CodeableConcept[] | undefined,
    readonly contact: ContactDetail[] | undefined,
    readonly description: string | undefined,
    readonly enrollment: Reference[] | undefined,
    readonly extension: Extension[] | undefined,
    readonly id: string | undefined,
    readonly identifier: Identifier[] | undefined,
    readonly location: CodeableConcept[] | undefined,
    readonly meta: Meta | undefined,
    originalContentsToEnhance: OriginalContentsToEnhanceModel | undefined,
    readonly period: Period | undefined,
    readonly phase: CodeableConcept | undefined,
    readonly primaryPurposeType: CodeableConcept | undefined,
    readonly referenceContents: ReferenceContentsModel,
    readonly relatedArtifact: RelatedArtifact[] | undefined,
    readonly site: Reference[] | undefined,
    status: RiphStatus,
    readonly title: string | undefined,
    readonly text: Narrative
  ) {
    this.originalContentsToEnhance = originalContentsToEnhance
    this.resourceType = 'ResearchStudy'
    this.status = this.convertToResearchStudyStatus(status)
  }

  private convertToResearchStudyStatus(riphStatus: RiphStatus): ResearchStudyStatus {
    const fhirStatus: Record<string, ResearchStudyStatus> = {
      ABANDONNEE: 'withdrawn',
      ARCHIVEE: 'completed',
      A_DEMARRER: 'approved',
      EN_COURS: 'active',
      EXPIREE: 'withdrawn',
      PROROGEE: 'approved',
      SUSPENDUE: 'temporarily-closed-to-accrual',
      TERMINEE: 'completed',
      TERMINEE_ANTICIPEE: 'administratively-completed',
    }

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
