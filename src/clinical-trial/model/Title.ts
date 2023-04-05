import { ApiProperty } from '@nestjs/swagger'

export class Title {
  constructor(partial: Partial<Title>) {
    Object.assign(this, partial)
  }

  @ApiProperty({ example: 'Voici un titre public de l\'essai clinique' })
  readonly value: string

  @ApiProperty({ example: 'VTPEC' })
  readonly acronym: string
}
