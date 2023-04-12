import { ApiProperty } from '@nestjs/swagger'

export class StudyType {
  constructor(studyType?: StudyType) {
    if (studyType) {
      Object.assign(this, studyType)
    }
  }

  @ApiProperty({
    description: 'Ccorrespond à la phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.',
    example: 'Phase II/Phase III',
  })
  readonly phase: string
}
