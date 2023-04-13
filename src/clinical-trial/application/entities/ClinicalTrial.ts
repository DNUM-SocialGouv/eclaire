import { ApiProperty } from '@nestjs/swagger'

import { StudyType } from './StudyType'
import { Title } from './Title'
import { Phase } from '../Phase'
import { RecruitmentStatus } from '../RecruitmentStatus'

export class ClinicalTrial {
  constructor(clinicalTrial?: Partial<ClinicalTrial>) {
    this.public_title = new Title()
    this.scientific_title = new Title()
    this.recruitment_status = RecruitmentStatus.UNAVAILABLE
    this.study_type = new StudyType()

    if (clinicalTrial) {
      Object.assign(this, clinicalTrial)
    }
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

  @ApiProperty({
    description: 'Il s’agit du statut de recrutement de l’essai clinique (cela précise si le recrutement est toujours actif)',
    enum: RecruitmentStatus,
    example: 'RECRUITING',
  })
  readonly recruitment_status: RecruitmentStatus

  @ApiProperty({
    description: 'Correspond à la phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.',
    enum: Phase,
    example: Phase.PHASE_2,
  })
  readonly study_type: StudyType
}
