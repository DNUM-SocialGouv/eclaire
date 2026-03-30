import { Type } from 'class-transformer'
import { IsString, IsBoolean, IsNumber, ValidateNested, IsOptional, IsEmail, IsArray } from 'class-validator'

import { CritereDto, SiteInvestigateurDto } from './common/EtudeCommonDto'

export class RiphJardeDto {
  @IsString()
    reglementation_code: string

  @IsString()
    etat: string

  @IsString()
  @IsOptional()
    type_promoteur?: string

  @IsString()
  @IsOptional()
    deposant_nom?: string

  @IsString()
  @IsOptional()
    deposant_prenom?: string

  @IsEmail()
  @IsOptional()
    deposant_courriel?: string

  @IsString()
  @IsOptional()
    deposant_organisme?: string

  @IsString()
  @IsOptional()
    deposant_adresse?: string

  @IsString()
  @IsOptional()
    deposant_siret?: string

  @IsString()
  @IsOptional()
    deposant_code_postal?: string

  @IsString()
  @IsOptional()
    deposant_ville?: string

  @IsString()
  @IsOptional()
    deposant_pays?: string

  @IsBoolean()
  @IsOptional()
    is_mandataire?: boolean

  @IsString()
  @IsOptional()
    promoteur_nom?: string

  @IsString()
  @IsOptional()
    promoteur_prenom?: string

  @IsEmail()
  @IsOptional()
    promoteur_email?: string

  @IsString()
  @IsOptional()
    promoteur_organisme?: string

  @IsString()
  @IsOptional()
    promoteur_adresse?: string

  @IsString()
  @IsOptional()
    promoteur_siret?: string

  @IsString()
  @IsOptional()
    promoteur_code_postal?: string

  @IsString()
  @IsOptional()
    promoteur_ville?: string

  @IsString()
  @IsOptional()
    promoteur_pays?: string

  @IsString()
  @IsOptional()
    mandataire_nom?: string

  @IsString()
  @IsOptional()
    mandataire_prenom?: string

  @IsEmail()
  @IsOptional()
    mandataire_email?: string

  @IsString()
  @IsOptional()
    mandataire_organisme?: string

  @IsString()
  @IsOptional()
    mandataire_adresse?: string

  @IsString()
  @IsOptional()
    mandataire_siret?: string

  @IsString()
  @IsOptional()
    mandataire_code_postal?: string

  @IsString()
  @IsOptional()
    mandataire_ville?: string

  @IsString()
  @IsOptional()
    mandataire_pays?: string

  @IsString()
    numero: string

  @IsString()
    numero_national: string

  @IsString()
  @IsOptional()
    investigateur?: string

  @IsString()
    titre_recherche: string

  @IsString()
  @IsOptional()
    domaine_therapeutique?: string

  @IsNumber()
  @IsOptional()
    taille_etude?: number

  @IsString()
  @IsOptional()
    competences?: string

  @IsString()
  @IsOptional()
    caracteristiques_recherche?: string

  @IsBoolean()
  @IsOptional()
    recherche_ancillaire_ou_extension?: boolean

  @IsString()
  @IsOptional()
    qualification_recherche?: string

  @IsString()
  @IsOptional()
    date_soumission?: string

  @IsString()
  @IsOptional()
    date_creation_etude?: string

  @IsString()
  @IsOptional()
    date_previsionnelle_fin_etude?: string

  @IsString()
  @IsOptional()
    historique?: string

  @IsString()
  @IsOptional()
    dates_avis_favorable_ms_mns?: string

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

  @IsString()
  @IsOptional()
    date_debut_recrutement?: string

  @IsString()
  @IsOptional()
    date_fin_recrutement?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiteInvestigateurDto)
  @IsOptional()
    sites_investigateurs?: SiteInvestigateurDto[]
}
