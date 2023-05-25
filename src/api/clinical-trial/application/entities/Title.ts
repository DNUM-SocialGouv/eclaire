import { ApiProperty } from '@nestjs/swagger'

export class Title {
  constructor(
    acronym: string,
    value: string
  ) {
    this.value = value
    this.acronym = acronym
  }

  @ApiProperty({
    description: 'Titre simplifié de l’essai clinique à destination du grand public.',
    example: 'Circuler l’ADN pour améliorer le résultat de l’oncologie patient',
  })
  readonly value: string

  @ApiProperty({
    description : 'Initiales qui permettent d’identifier une recherche clinique (tous les essais clinique n’en ont pas forcément).',
    example: 'AGADIR',
  })
  readonly acronym: string
}
