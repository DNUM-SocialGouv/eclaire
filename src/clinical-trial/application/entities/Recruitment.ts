import { ApiProperty } from '@nestjs/swagger'

import { Gender } from '../Gender'
import { RecruitmentStatus } from '../RecruitmentStatus'

export class Recruitment {
  constructor(
    status: string,
    genders: Gender[]
  ) {
    this.status = status
    this.genders = genders
  }

  @ApiProperty({
    description: 'Il s’agit du statut de recrutement de l’essai clinique (cela précise si le recrutement est toujours actif)',
    enum: RecruitmentStatus,
    example: 'RECRUITING',
  })
  readonly status: string

  @ApiProperty({
    description: 'Correspond au genre (sexe) du candidat. Il est inclus comme critère d’inclusion pour participer à l’essai clinique. ',
    enum: Gender,
    example: 'FEMALE, MALE',
  })
  readonly genders: Gender[]
}
