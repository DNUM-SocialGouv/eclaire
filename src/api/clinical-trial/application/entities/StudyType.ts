import { ApiProperty } from '@nestjs/swagger'

import { Type } from '../../../../etl/traductions/Type'

export class StudyType {
  constructor(
    phase: string,
    type: string,
    design: string,
    category: string
  ) {
    this.phase = phase
    this.type = type
    this.design = design
    this.category = category
  }

  @ApiProperty({
    description: 'Correspond à la phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.',
    example: 'Phase II/Phase III',
  })
  readonly phase: string

  @ApiProperty({
    description: 'La typologie de l’essai correspond à la nature de l’essai et à la réglementation à laquelle il se rattache.',
    enum: Type,
    example: 'REG536',
  })
  readonly type: string

  @ApiProperty()
  readonly design: string

  @ApiProperty({
    description: `La catégorie de l’essai précise le degré d’intervention lié à l’essai clinique au sein d’une typologie.<br>
    <a href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32017R0745#d1e1342-1-1">Définition dispositif médical</a><br>
    <a href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=celex:32014R0536#d1e772-1-1">Définition essai clinique</a><br>
    <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046125746">Définition recherche impliquant la personne humaine et catégories associées</a><br>
    <a href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32017R0746#d1e1165-176-1">Définition étude de performance</a>`,
    example: 'Catégorie 1',
  })
  readonly category: string
}
