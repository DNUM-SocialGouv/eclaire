import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { TitleModel } from './TitleModel'
import { StudyType } from '../entities/StudyType'
import { Phase } from '../enum/Phase.enum'
import { RecruitmentStatus } from '../enum/RecruitmentStatus.enum'

export class ClinicalTrialModel {
  constructor(clinicalTrialModel: ClinicalTrialModel) {
    Object.assign(this, clinicalTrialModel)
  }

  // TODO: transférer @ApiProperty() dans l'entity ?
  @ApiHideProperty()
  readonly uuid: string

  @ApiProperty()
  readonly public_title: TitleModel

  @ApiProperty({
    description: 'Titre officiel de l’essai clinique',
    example: {
      acronym: 'AGADIR',
      value: 'Circuler l’ADN pour améliorer le résultat de l’oncologie patient. Une étude randomisée',
    },
  })
  readonly scientific_title: TitleModel

  @ApiProperty({
    description: 'Il s’agit du statut de recrutement de l’essai clinique (cela précise si le recrutement est toujours actif)',
    enum: RecruitmentStatus,
    example: 'RECRUITING',
  })
  readonly recruitment_status: string

  @ApiProperty({
    description: 'Correspond à la phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.',
    enum: Phase,
    example: Phase.PHASE_2,
  })
  readonly study_type: StudyType
}
