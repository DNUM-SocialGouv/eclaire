import { ApiProperty } from '@nestjs/swagger'

export class TherapeuticArea {
  constructor(
    value: string,
    code: string
  ) {
    this.value = value
    this.code = code
  }

  @ApiProperty({ description: 'Nom du domaine thérapeutique', example: 'Circulatory and Respiratory Physiological Phenomena' })
  readonly value: string

  @ApiProperty({ description: 'Code du domaine thérapeutique', example: 'G' })
  readonly code: string
}
