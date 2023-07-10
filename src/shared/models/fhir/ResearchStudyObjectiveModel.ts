import {
  CodeableConcept,
  ResearchStudyObjective,
} from 'fhir/r4'

export class ResearchStudyObjectiveModel implements ResearchStudyObjective {
  constructor(
    readonly id: string | undefined,
    readonly name: string | undefined,
    readonly type: CodeableConcept | undefined
  ) {}
}
