import { RiphCtisDto } from './RiphCtisDto'

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
    readonly numero_ctis: string,
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
      riphCtisDto.sites,
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
