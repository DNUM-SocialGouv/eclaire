import { ApiProperty } from '@nestjs/swagger'

export class StudyType {
  constructor(
    phase: string,
    type: string,
    design: string
  ) {
    this.phase = phase
    this.type = type
    this.design = design
  }

  @ApiProperty({
    description: 'Correspond à la phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.',
    example: 'Phase II/Phase III',
  })
  readonly phase: string

  @ApiProperty()
  readonly type: string

  @ApiProperty()
  readonly design: string
}
