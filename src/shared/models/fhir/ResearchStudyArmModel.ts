import { CodeableConcept, ResearchStudyArm } from 'fhir/r4'

export class ResearchStudyArmModel implements ResearchStudyArm {
  constructor(
    readonly description: string | undefined,
    readonly id: string | undefined,
    readonly name: string,
    readonly type: CodeableConcept | undefined
  ) {}
}
