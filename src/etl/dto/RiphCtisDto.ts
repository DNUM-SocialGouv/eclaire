import { Type } from 'class-transformer'
import { IsString, IsNumber, ValidateNested, IsOptional, IsEmail, IsArray } from 'class-validator'

import { CritereDto, SiteInvestigateurDto } from './common/EtudeCommonDto'

export class RiphCtisDto {
  @IsString()
    reglementation_code: string

  @IsString()
    etat: string

  @IsString()
  @IsOptional()
    organisme_nom?: string

  @IsString()
  @IsOptional()
    organisme_adresse?: string

  @IsString()
  @IsOptional()
    organisme_code_postal?: string

  @IsString()
  @IsOptional()
    organisme_pays?: string

  @IsString()
  @IsOptional()
    organisme_ville?: string

  @IsString()
  @IsOptional()
    contact_nom?: string

  @IsString()
  @IsOptional()
    contact_prenom?: string

  @IsString()
  @IsOptional()
    contact_telephone?: string

  @IsEmail()
  @IsOptional()
    contact_courriel?: string

  @IsString()
    numero_ctis?: string

  @IsString()
    titre?: string

  @IsString()
  @IsOptional()
    intervention_faible?: string

  @IsString()
  @IsOptional()
    phase_recherche?: string

  @IsString()
  @IsOptional()
    domaine_therapeutique?: string

  @IsString()
  @IsOptional()
    pathologies_maladies_rares?: string

  @IsString()
  @IsOptional()
    informations_meddra?: string

  @IsString()
  @IsOptional()
    portee_recherche?: string

  @IsNumber()
  @IsOptional()
    taille_etude?: number

  @IsString()
  @IsOptional()
    tranches_age?: string

  @IsString()
  @IsOptional()
    sexe?: string

  @IsString()
  @IsOptional()
    groupes_sujet?: string

  @IsString()
  @IsOptional()
    population_recrutement?: string

  @IsString()
  @IsOptional()
    description_urgence?: string

  @IsString()
  @IsOptional()
    date_debut_recrutement?: string

  @IsString()
  @IsOptional()
    date_fin_recrutement?: string

  @IsString()
  @IsOptional()
    date_fin_etude?: string

  @IsString()
  @IsOptional()
    historique?: string

  @IsString()
  @IsOptional()
    dates_avis_favorable_ms_mns?: string

  @IsString()
  @IsOptional()
    pays_concernes?: string

  @IsString()
  @IsOptional()
    contact_public_nom?: string

  @IsString()
  @IsOptional()
    contact_public_prenom?: string

  @IsEmail()
  @IsOptional()
    contact_public_courriel?: string

  @IsString()
  @IsOptional()
    contact_public_telephone?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CritereDto)
  @IsOptional()
    criteres_eligibilite?: CritereDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CritereDto)
  @IsOptional()
    criteres_jugement?: CritereDto[]

  @IsString()
    publication_eclaire: string

  @IsString()
  @IsOptional()
    numero_nct?: string

  @IsString()
  @IsOptional()
    numero_isrctn?: string

  @IsString()
  @IsOptional()
    numero_utn?: string

  @IsString()
  @IsOptional()
    numero_libre?: string

  @IsString()
  @IsOptional()
    objectifs?: string

  @IsString()
  @IsOptional()
    resume?: string

  @IsString()
  @IsOptional()
    duree_participation?: string

  @IsString()
  @IsOptional()
    participants_sexe?: string

  @IsString()
  @IsOptional()
    participants_tranches_age?: string

  @IsString()
  @IsOptional()
    participants_groupe_sujets?: string

  @IsString()
  @IsOptional()
    participants_population_vulnerable?: string

  @IsString()
  @IsOptional()
    statut_recrutement?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiteInvestigateurDto)
  @IsOptional()
    sites_investigateurs?: SiteInvestigateurDto[]

}
