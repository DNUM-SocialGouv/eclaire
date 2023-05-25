import { ApiProperty } from '@nestjs/swagger'

export class Criteria {
  constructor(
    id: string,
    value: string,
    value_language: string
  ) {
    this.id = id
    this.value = value
    this.value_language = value_language
  }

  @ApiProperty({
    description: 'Identifiant du critère.',
    example: '1',
  })
  readonly id: string

  @ApiProperty({
    description: 'Valeur du critère.',
    example: 'femme porteuse d’un cancer du sein stade terminal',
  })
  readonly value: string

  @ApiProperty({
    description: 'Valeur traduite du critère.',
    example: 'women with breast cancer terminal phase',
  })
  readonly value_language: string
}
