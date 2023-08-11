import { RiphCtisDto } from './RiphCtisDto'
import { RiphDmDto } from './RiphDmDto'
import { RiphJardeDto } from './RiphJardeDto'
import { ModelUtils } from '../../shared/models/eclaire/ModelUtils'

export class EclaireDto {
  constructor(
    readonly reglementation_code: string,
    readonly etat: string,
    readonly organisme_nom: string,
    readonly organisme_adresse: string,
    readonly organisme_code_postal: string,
    readonly organisme_pays: string,
    readonly organisme_ville: string,
    readonly contact_nom: string,
    readonly contact_prenom: string,
    readonly contact_telephone: string,
    readonly contact_courriel: string,
    readonly sites: Site[],
    readonly numero_secondaire: string,
    readonly titre: string,
    readonly intervention_faible: string,
    readonly phase_recherche: string,
    readonly domaine_therapeutique: string,
    readonly pathologies_maladies_rares: string,
    readonly informations_meddra: string,
    readonly taille_etude: number,
    readonly tranches_age: string,
    readonly sexe: string,
    readonly groupes_sujet: string,
    readonly population_recrutement: string,
    readonly date_debut_recrutement: string,
    readonly historique: string,
    readonly dates_avis_favorable_ms_mns: string,
    readonly pays_concernes: string
  ) {}

  static fromCtis(riphCtisDto: RiphCtisDto): EclaireDto {
    const sites = riphCtisDto.sites.map((site): Site => new Site(
      site.organisme,
      site.adresse,
      site.ville,
      site.titre,
      site.nom,
      site.prenom,
      site.service
    ))

    return new EclaireDto(
      riphCtisDto.reglementation_code,
      riphCtisDto.etat,
      riphCtisDto.organisme_nom,
      riphCtisDto.organisme_adresse,
      riphCtisDto.organisme_code_postal,
      riphCtisDto.organisme_pays,
      riphCtisDto.organisme_ville,
      riphCtisDto.contact_nom,
      riphCtisDto.contact_prenom,
      riphCtisDto.contact_telephone,
      riphCtisDto.contact_courriel,
      sites,
      riphCtisDto.numero_ctis,
      riphCtisDto.titre,
      riphCtisDto.intervention_faible,
      riphCtisDto.phase_recherche,
      riphCtisDto.domaine_therapeutique,
      riphCtisDto.pathologies_maladies_rares,
      riphCtisDto.informations_meddra,
      riphCtisDto.taille_etude,
      riphCtisDto.tranches_age,
      riphCtisDto.sexe,
      riphCtisDto.groupes_sujet,
      riphCtisDto.population_recrutement,
      riphCtisDto.date_debut_recrutement,
      riphCtisDto.historique,
      riphCtisDto.dates_avis_favorable_ms_mns,
      riphCtisDto.pays_concernes
    )
  }

  static fromDm(riphDmDto: RiphDmDto): EclaireDto {
    return new EclaireDto(
      riphDmDto.reglementation_code,
      riphDmDto.etat,
      riphDmDto.deposant_organisme,
      riphDmDto.deposant_adresse,
      riphDmDto.deposant_code_postal,
      riphDmDto.deposant_pays,
      riphDmDto.deposant_ville,
      riphDmDto.deposant_nom,
      riphDmDto.deposant_prenom,
      ModelUtils.UNAVAILABLE,
      riphDmDto.deposant_courriel,
      ModelUtils.EMPTY_ARRAY_IN_SOURCE,
      riphDmDto.numero_national,
      riphDmDto.titre_recherche,
      ModelUtils.NULL_IN_SOURCE,
      ModelUtils.NULL_IN_SOURCE,
      riphDmDto.domaine_therapeutique,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE,
      riphDmDto.taille_etude,
      ModelUtils.UNAVAILABLE,
      ModelUtils.NULL_IN_SOURCE,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE,
      ModelUtils.NULL_IN_SOURCE,
      riphDmDto.historique,
      riphDmDto.dates_avis_favorable_ms_mns,
      ModelUtils.NULL_IN_SOURCE
    )
  }

  static fromJarde(riphJardeDto: RiphJardeDto): EclaireDto {
    return new EclaireDto(
      riphJardeDto.reglementation_code,
      riphJardeDto.etat,
      riphJardeDto.deposant_organisme,
      riphJardeDto.deposant_adresse,
      riphJardeDto.deposant_code_postal,
      riphJardeDto.deposant_pays,
      riphJardeDto.deposant_ville,
      riphJardeDto.deposant_nom,
      riphJardeDto.deposant_prenom,
      ModelUtils.UNAVAILABLE,
      riphJardeDto.deposant_courriel,
      ModelUtils.EMPTY_ARRAY_IN_SOURCE,
      riphJardeDto.numero_national,
      riphJardeDto.titre_recherche,
      ModelUtils.NULL_IN_SOURCE,
      ModelUtils.NULL_IN_SOURCE,
      riphJardeDto.domaine_therapeutique,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE,
      riphJardeDto.taille_etude,
      ModelUtils.UNAVAILABLE,
      ModelUtils.NULL_IN_SOURCE,
      ModelUtils.UNAVAILABLE,
      ModelUtils.UNAVAILABLE,
      ModelUtils.NULL_IN_SOURCE,
      riphJardeDto.historique,
      riphJardeDto.dates_avis_favorable_ms_mns,
      ModelUtils.NULL_IN_SOURCE
    )
  }
}

class Site {
  constructor(
    readonly organisme: string,
    readonly adresse: string,
    readonly ville: string,
    readonly titre: string,
    readonly nom: string,
    readonly prenom: string,
    readonly service: string
  ) {}
}
