import { ApiProperty } from '@nestjs/swagger'

export class StudyType {
  constructor(studyType?: Partial<StudyType>) {
    if (studyType) {
      Object.assign(this, studyType)
    }
  }

  @ApiProperty({
    description: 'Correspond à la phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.',
    example: 'Phase II/Phase III',
  })
  readonly phase: string = ''

  @ApiProperty()
  readonly study_type: string = ''

  @ApiProperty()
  readonly study_design: string = ''
}
