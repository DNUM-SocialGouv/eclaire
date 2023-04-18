import { ApiProperty } from '@nestjs/swagger'

export class StudyType {
  constructor(
    phase: string,
    study_type: string,
    study_design: string
  ) {
    this.phase = phase
    this.study_type = study_type
    this.study_design = study_design
  }

  @ApiProperty({
    description: 'Correspond à la phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.',
    example: 'Phase II/Phase III',
  })
  readonly phase: string

  @ApiProperty()
  readonly study_type: string

  @ApiProperty()
  readonly study_design: string
}
