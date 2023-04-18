import { ApiProperty } from '@nestjs/swagger'

import { PrimaryAge } from '../PrimaryAge'
import { SecondaryAge } from '../SecondaryAge'

export class StudyType {
  constructor(
    phase: string,
    study_type: string,
    study_design: string,
    ages_range: PrimaryAge[],
    age_range_secondary_identifiers: SecondaryAge[]
  ) {
    this.phase = phase
    this.study_type = study_type
    this.study_design = study_design
    this.ages_range = ages_range
    this.age_range_secondary_identifiers = age_range_secondary_identifiers
  }

  @ApiProperty({
    description: 'Correspond à la phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.',
    example: 'Phase II/Phase III',
  })
  readonly phase: string

  @ApiProperty()
  readonly study_type: string

  @ApiProperty()
  readonly study_design: string

  @ApiProperty({
    description: 'L’âge minimum et maximum d’inclusion des patients pour le recrutement de l’essai clinique.',
    enum: PrimaryAge,
    example: [PrimaryAge.IN_UTERO, PrimaryAge.ZERO_SEVENTEEN_YEARS],
  })
  readonly ages_range: PrimaryAge[]

  @ApiProperty({
    description: 'L’âge minimum et maximum d’inclusion des patients pour le recrutement de l’essai clinique mais avec plus de précision la catégorie d’âge ciblé.',
    enum: SecondaryAge,
    example: [SecondaryAge.PRETERM_NEWBORN, SecondaryAge.SIX_ELEVEN_YEARS],
  })
  readonly age_range_secondary_identifiers: SecondaryAge[]
}
