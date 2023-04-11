import { ApiProperty } from '@nestjs/swagger'

export class TitleModel {
  constructor(titleModel: TitleModel) {
    Object.assign(this, titleModel)
  }

  @ApiProperty({ example: 'Voici un titre public de l\'essai clinique' })
  readonly value: string

  @ApiProperty({ example: 'VTPEC' })
  readonly acronym: string
}
