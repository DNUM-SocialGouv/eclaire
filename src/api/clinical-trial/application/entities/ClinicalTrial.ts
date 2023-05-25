import { ApiProperty } from '@nestjs/swagger'

import { Contact } from './Contact'
import { ContactDetails } from './ContactDetails'
import { Recruitment } from './Recruitment'
import { StudyType } from './StudyType'
import { TherapeuticArea } from './TherapeuticArea'
import { Title } from './Title'

export class ClinicalTrial {
  constructor(
    universal_trial_number: string,
    secondaries_trial_numbers: Record<string, string>,
    public_title: Title,
    scientific_title: Title,
    recruitment: Recruitment,
    study_type: StudyType,
    last_revision_date: string,
    contact: Contact,
    medical_condition: string,
    medical_condition_meddra: string[],
    therapeutic_areas: TherapeuticArea[],
    primary_sponsor: ContactDetails,
    trial_sites: ContactDetails[],
    summary: string
  ) {
    this.universal_trial_number = universal_trial_number
    this.secondaries_trial_numbers = secondaries_trial_numbers
    this.public_title = public_title
    this.scientific_title = scientific_title
    this.recruitment = recruitment
    this.study_type = study_type
    this.last_revision_date = last_revision_date
    this.contact = contact
    this.medical_condition = medical_condition
    this.medical_condition_meddra = medical_condition_meddra
    this.therapeutic_areas = therapeutic_areas
    this.primary_sponsor = primary_sponsor
    this.trial_sites = trial_sites
    this.summary = summary
  }

  @ApiProperty({
    description: 'Correspond au numéro d’identification universel de l’essai clinique : il permet de garder une traçabilité de l’essai entre différents registres.',
    example: 'NCT00000419',
  })
  readonly universal_trial_number: string

  @ApiProperty({
    description: 'Regroupe l’ensemble des numéros d’identification secondaires qui sont liés à l’essai clinique.',
    example: {
      AFR_number: 'AFRXXXXXXXX',
      example_number: 'MonNuméro123',
      national_number: '2011-006209-83',
    },
    type: 'Record<string, string>',
  })
  readonly secondaries_trial_numbers: Record<string, string>

  @ApiProperty({ description: 'Titre public de l’essai clinique.' })
  readonly public_title: Title

  @ApiProperty({ description: 'Titre officiel de l’essai clinique.' })
  readonly scientific_title: Title

  @ApiProperty({ description: 'Ensemble de données relatives au recrutement des candidats de l’essai clinique.' })
  readonly recruitment: Recruitment

  @ApiProperty({ description: 'Phase de la recherche de l’essai clinique. Les essais cliniques testant de nouveaux traitements comportent plusieurs étapes, appelées phases.' })
  readonly study_type: StudyType

  @ApiProperty({
    description: 'Date de dernière modification du dossier de l’essai clinique.',
    example: '2022-02-06T18:25:43.511Z',
  })
  readonly last_revision_date: string

  @ApiProperty({ description: 'Le nom et les informations de contact qui permettent à un volontaire d’avoir des informations concernant l’essai clinique (critères d’inclusions, informations sur l’essai,...).' })
  readonly contact: Contact

  @ApiProperty({
    description: 'Nom de la pathologie liées à l’essai clinique.',
    example: 'Cancer des poumons',
  })
  readonly medical_condition: string

  @ApiProperty({
    description: 'Code(s) relatif(s) à une pathologie MedDRA.',
    example: ['10060929', '10072818'],
  })
  readonly medical_condition_meddra: string[]

  @ApiProperty({
    description: 'Le domaine thérapeutique d’un essai clinique correspond au champ de la recherche et développement d’un traitement spécifique à certaines pathologies et conditions de santé.',
    type: [TherapeuticArea],
  })
  readonly therapeutic_areas: TherapeuticArea[]

  @ApiProperty({ description: 'Le promoteur est la personne physique, la société ou l’institution qui prend l’initiative d’un essai clinique et en assume les responsabilités et le financement.' })
  readonly primary_sponsor: ContactDetails

  @ApiProperty({ description: 'Sites d’investigation : correspond à la liste des sites où l’essai clinique prend place, avec pour chaque site la localisation et les informations de contact.', type: [ContactDetails] })
  readonly trial_sites: ContactDetails[]

  @ApiProperty({
    description: 'Le résumé de l’essai clinique est à destination du grand public. Il comprend les informations suivantes : contexte de l’essai clinique, la / les pathologies concernées par l’essai clinique, les objectifs de l’essai clinique, les cohortes et bras.',
    example: 'le contexte des cette étude est le suivant, les gens addicts aux dragibus. L’objectif de l’étude est de voir l’effet des bonbons sur les dents des enfants. La pathologie visée les grosses caries. Essai de cohorte les enfants avec caries et sans caries sont comparés.',
  })
  readonly summary: string
}
