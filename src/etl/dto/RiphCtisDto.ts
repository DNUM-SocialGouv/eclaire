export class RiphCtisDto {
  private constructor(
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
    readonly sites_investigateurs: Site[],
    readonly numero_ctis: string,
    readonly titre: string,
    readonly intervention_faible: string,
    readonly phase_recherche: string,
    readonly domaine_therapeutique: string,
    readonly pathologies_maladies_rares: string,
    readonly informations_meddra: string,
    readonly portee_recherche: string,
    readonly taille_etude: number,
    readonly tranches_age: string,
    readonly sexe: string,
    readonly groupes_sujet: string,
    readonly population_recrutement: string,
    readonly description_urgence: string,
    readonly date_debut_recrutement: string,
    readonly date_fin_etude: string,
    readonly historique: string,
    readonly dates_avis_favorable_ms_mns: string,
    readonly pays_concernes: string,
    readonly contact_public_nom: string,
    readonly contact_public_prenom: string,
    readonly contact_public_courriel: string,
    readonly contact_public_telephone: string,
    readonly criteres_eligibilite: Critere[],
    readonly criteres_jugement: Critere[],
    readonly publication_eclaire: string,
    readonly numero_nct: string,
    readonly numero_isrctn: string,
    readonly numero_utn: string,
    readonly numero_libre: string,
    readonly objectifs: string,
    readonly resume: string,
    readonly duree_participation: string,
    readonly participants_sexe: string,
    readonly participants_tranches_age: string,
    readonly participants_groupe_sujets: string,
    readonly participants_population_vulnerable: string,
    readonly statut_recrutement: string,
    readonly date_fin_recrutement: string
  ) {
  }
}

class Critere {
  private constructor(
    readonly titre: string,
    readonly type: string
  ) {
  }
}

class Site {
  private constructor(
    readonly organisme: string,
    readonly adresse: string,
    readonly ville: string,
    readonly titre: string,
    readonly nom: string,
    readonly prenom: string,
    readonly service: string,
    readonly code_postal: string,
    readonly courriel: string,
    readonly telephone: string
  ) {
  }
}
