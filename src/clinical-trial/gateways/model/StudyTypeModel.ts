export class StudyTypeModel {
  constructor(studyTypeModel?: Partial<StudyTypeModel>) {
    if (studyTypeModel) {
      Object.assign(this, studyTypeModel)
    }
  }

  readonly phase: string = ''
  readonly study_type: string = ''
  readonly study_design: string = ''
}
