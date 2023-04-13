import { ApiProperty } from '@nestjs/swagger'

import { StudyType } from './StudyType'
import { Title } from './Title'
import { RecruitmentStatus } from '../RecruitmentStatus'

export class ClinicalTrial {
  constructor(clinicalTrial?: Partial<ClinicalTrial>) {
    if (clinicalTrial) {
      Object.assign(this, clinicalTrial)
    }
  }

  @ApiProperty()
  readonly public_title: Title = new Title()

  @ApiProperty({
    description: 'Titre officiel de l’essai clinique',
    example: {
      acronym: 'AGADIR',
      value: 'Circuler l’ADN pour améliorer le résultat de l’oncologie patient. Une étude randomisée',
    },
  })
  readonly scientific_title: Title = new Title()

  @ApiProperty({
    description: 'Il s’agit du statut de recrutement de l’essai clinique (cela précise si le recrutement est toujours actif)',
    enum: RecruitmentStatus,
    example: 'RECRUITING',
  })
  readonly recruitment_status: RecruitmentStatus = RecruitmentStatus.UNAVAILABLE

  @ApiProperty({ description: 'Phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.' })
  readonly study_type: StudyType = new StudyType()

  @ApiProperty({
    description: 'Date de dernière modification du dossier de l’essai clinique',
    example: '2022-02-06T18:25:43.511Z',
  })
  readonly last_revision_date: string = ''
}
