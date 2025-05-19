import { CodeableConcept, Extension, ResearchStudyArm } from 'fhir/r4'

import { ExtensionModel } from '../special-purpose-data-types/ExtensionModel'

export class ResearchStudyArmModel implements ResearchStudyArm {

  constructor(
    readonly name: string,
    readonly type: CodeableConcept,
    readonly description: string,
    readonly extension: Extension[] | undefined
  ) {
  }
  static create(name: string, type: CodeableConcept, description: string, duration: number, treatments: string[]): ResearchStudyArmModel[] {
    if (name === undefined || description === undefined) {
      return undefined
    }

    const extensions: Extension[] = []
    extensions.push(ExtensionModel.createEclaireParticipationDuration(duration))

    if (treatments && treatments.length > 0) {
      treatments.forEach((treatment: string) => {
        extensions.push(ExtensionModel.createEclaireTreatment(treatment))
      })
    }

    return [
      new ResearchStudyArmModel(
        name,
        type,
        description,
        extensions
      ),
    ]
  }
}
