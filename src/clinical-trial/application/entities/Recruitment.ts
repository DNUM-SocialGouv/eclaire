import { ApiProperty } from '@nestjs/swagger'

import { Criteria } from './Criteria'
import { Gender } from '../Gender'
import { PrimaryAge } from '../PrimaryAge'
import { RecruitmentStatus } from '../RecruitmentStatus'
import { SecondaryAge } from '../SecondaryAge'

export class Recruitment {
  constructor(
    status: string,
    genders: Gender[],
    ages_range: PrimaryAge[],
    ages_range_secondary_identifiers: SecondaryAge[],
    target_number: number,
    exclusion_criteria: Criteria,
    inclusion_criteria: Criteria,
    clinical_trial_group: string,
    vulnerable_population: string
  ) {
    this.status = status
    this.genders = genders
    this.ages_range = ages_range
    this.ages_range_secondary_identifiers = ages_range_secondary_identifiers
    this.target_number = target_number
    this.exclusion_criteria = exclusion_criteria
    this.inclusion_criteria = inclusion_criteria
    this.clinical_trial_group = clinical_trial_group
    this.vulnerable_population = vulnerable_population
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
    description: 'L’âge minimum et maximum d’inclusion des patients pour le recrutement de l’essai clinique mais avec plus de précision sur la catégorie d’âge ciblée.',
    enum: SecondaryAge,
    example: [SecondaryAge.PRETERM_NEWBORN, SecondaryAge.SIX_ELEVEN_YEARS],
  })
  readonly ages_range_secondary_identifiers: SecondaryAge[]

  @ApiProperty({
    description: 'Le nombre de personnes ciblées pour le recrutement de l’essai clinique',
    example: 400,
  })
  readonly target_number: number

  @ApiProperty({ description: 'Les critères d’exclusion ou de non inclusion sont des critères négatifs, c’est à dire qu’ils décrivent les caractéristiques que ne doivent pas présenter les personnes pour être incluses dans l’essai.' })
  readonly exclusion_criteria: Criteria

  @ApiProperty({ description: 'Les critères d’inclusion sont des critères positifs décrivant les caractéristiques que doivent présenter les personnes pour être incluses.' })
  readonly inclusion_criteria: Criteria

  @ApiProperty({ description: 'Fait référence à la catégorie de volontaires ciblés dans le cadre de l’essai clinique. Il peut s’agir de patient ou de volontaire sains.' })
  readonly clinical_trial_group: string

  @ApiProperty({ description: 'Il s’agit des types de population qui peuvent être ciblées dans le cadre du recrutement d’un essai clinique. Cela s’apparente à un critère d’inclusion.' })
  readonly vulnerable_population: string
}
