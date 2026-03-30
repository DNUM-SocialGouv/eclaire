import { IsString, IsOptional, IsEmail } from 'class-validator'

export class CritereDto {
  @IsString()
  @IsOptional()
    titre?: string

  @IsString()
  @IsOptional()
    type?: string
}

export class SiteInvestigateurDto {
  @IsString()
  @IsOptional()
    organisme?: string

  @IsString()
  @IsOptional()
    adresse?: string

  @IsString()
  @IsOptional()
    ville?: string

  @IsString()
  @IsOptional()
    titre?: string // For CTIS only

  @IsString()
  @IsOptional()
    titre_investigateur?: string // For Jarde and DM

  @IsString()
  @IsOptional()
    nom?: string

  @IsString()
  @IsOptional()
    prenom?: string

  @IsString()
  @IsOptional()
    service?: string

  @IsString()
  @IsOptional()
    code_postal?: string

  @IsEmail()
  @IsOptional()
    courriel?: string

  @IsString()
  @IsOptional()
    telephone?: string
}
