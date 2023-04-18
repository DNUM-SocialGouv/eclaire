import { ApiProperty } from '@nestjs/swagger'

import { Gender } from '../Gender'
import { PrimaryAge } from '../PrimaryAge'
import { RecruitmentStatus } from '../RecruitmentStatus'
import { SecondaryAge } from '../SecondaryAge'

export class Recruitment {
  constructor(
    status: string,
    genders: Gender[],
    ages_range: PrimaryAge[],
    ages_range_secondary_identifiers: SecondaryAge[]
  ) {
    this.status = status
    this.genders = genders
    this.ages_range = ages_range
    this.ages_range_secondary_identifiers = ages_range_secondary_identifiers
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
    example: ['FEMALE', 'MALE'],
  })
  readonly genders: Gender[]

  @ApiProperty({
    description: 'L’âge minimum et maximum d’inclusion des patients pour le recrutement de l’essai clinique.',
    enum: PrimaryAge,
    example: [PrimaryAge.IN_UTERO, PrimaryAge.ZERO_SEVENTEEN_YEARS],
  })
  readonly ages_range: PrimaryAge[]

  @ApiProperty({
    description: 'L’âge minimum et maximum d’inclusion des patients pour le recrutement de l’essai clinique mais avec plus de précision sur la catégorie d’âge ciblé.',
    enum: SecondaryAge,
    example: [SecondaryAge.PRETERM_NEWBORN, SecondaryAge.SIX_ELEVEN_YEARS],
  })
  readonly ages_range_secondary_identifiers: SecondaryAge[]
}
