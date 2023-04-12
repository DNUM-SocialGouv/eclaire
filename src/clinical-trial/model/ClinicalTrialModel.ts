import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { TitleModel } from './TitleModel'
import { RecruitmentStatus } from '../entities/RecruitmentStatus'

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
}
