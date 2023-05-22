import { ApiProperty } from '@nestjs/swagger'

import { Criteria } from './Criteria'
import { Gender } from '../../../../etl/traductions/Gender'
import { PrimaryAge } from '../../../../etl/traductions/PrimaryAge'
import { RecruitmentStatus } from '../../../../etl/traductions/RecruitmentStatus'
import { SecondaryAge } from '../../../../etl/traductions/SecondaryAge'

export class Recruitment {
  constructor(
    status: string,
    date_recruiting_status: string,
    genders: string[],
    ages_range: string[],
    ages_range_secondary_identifiers: string[],
    target_number: number,
    exclusion_criteria: Criteria,
    inclusion_criteria: Criteria,
    clinical_trial_group: string,
    vulnerable_population: string[]
  ) {
    this.status = status
    this.date_recruiting_status = date_recruiting_status
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
    example: RecruitmentStatus.EN_COURS,
  })
  readonly status: string

  @ApiProperty({
    description: 'Date liée statut de l’essai clinique. Quand l’essai clinique est en cours ou à venir, la date renseigne donc la date de début de recrutement.',
    example: '2022-02-06T18:25:43.511Z',
  })
  readonly date_recruiting_status: string

  @ApiProperty({
    description: 'Correspond au genre (sexe) du candidat. Il est inclus comme critère d’inclusion pour participer à l’essai clinique. ',
    enum: Gender,
    example: ['femme', 'homme'],
  })
  readonly genders: string[]

  @ApiProperty({
    description: 'L’âge minimum et maximum d’inclusion des patients pour le recrutement de l’essai clinique.',
    enum: PrimaryAge,
    example: [PrimaryAge['0-17 years'], PrimaryAge['65+ years']],
  })
  readonly ages_range: string[]

  @ApiProperty({
    description: 'L’âge minimum et maximum d’inclusion des patients pour le recrutement de l’essai clinique mais avec plus de précision sur la catégorie d’âge ciblée.',
    enum: SecondaryAge,
    example: [SecondaryAge.PRETERM_NEWBORN, SecondaryAge.SIX_ELEVEN_YEARS],
  })
  readonly ages_range_secondary_identifiers: string[]

  @ApiProperty({
    description: 'Le nombre de personnes ciblées pour le recrutement de l’essai clinique',
    example: 400,
  })
  readonly target_number: number

  @ApiProperty({ description: 'Les critères d’exclusion ou de non inclusion sont des critères négatifs, c’est à dire qu’ils décrivent les caractéristiques que ne doivent pas présenter les personnes pour être incluses dans l’essai.' })
  readonly exclusion_criteria: Criteria

  @ApiProperty({ description: 'Les critères d’inclusion sont des critères positifs décrivant les caractéristiques que doivent présenter les personnes pour être incluses.' })
  readonly inclusion_criteria: Criteria

  @ApiProperty({
    description: 'Fait référence à la catégorie de volontaires ciblés dans le cadre de l’essai clinique. Il peut s’agir de patient ou de volontaire sains.',
    example: 'Patient',
  })
  readonly clinical_trial_group: string

  @ApiProperty({
    description: 'Il s’agit des types de population qui peuvent être ciblées dans le cadre du recrutement d’un essai clinique. Cela s’apparente à un critère d’inclusion.',
    example: ['Pregnant women'],
  })
  readonly vulnerable_population: string[]
}
