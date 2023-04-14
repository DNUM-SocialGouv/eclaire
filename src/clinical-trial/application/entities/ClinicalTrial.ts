import { ApiProperty } from '@nestjs/swagger'

import { Recruitment } from './Recruitment'
import { StudyType } from './StudyType'
import { Title } from './Title'

export class ClinicalTrial {
  constructor(
    public_title: Title,
    scientific_title: Title,
    recruitment: Recruitment,
    study_type: StudyType,
    last_revision_date: string
  ) {
    this.public_title = public_title
    this.scientific_title = scientific_title
    this.recruitment = recruitment
    this.study_type = study_type
    this.last_revision_date = last_revision_date
  }

  @ApiProperty()
  readonly public_title: Title

  @ApiProperty({
    description: 'Titre officiel de l’essai clinique',
    example: {
      acronym: 'AGADIR',
      value: 'Circuler l’ADN pour améliorer le résultat de l’oncologie patient. Une étude randomisée',
    },
  })
  readonly scientific_title: Title

  @ApiProperty({ description: 'Ensemble de données relatives au recrutement des candidats de l\'essai clinique.' })
  readonly recruitment: Recruitment

  @ApiProperty({ description: 'Phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.' })
  readonly study_type: StudyType

  @ApiProperty({
    description: 'Date de dernière modification du dossier de l’essai clinique',
    example: '2022-02-06T18:25:43.511Z',
  })
  readonly last_revision_date: string
}
