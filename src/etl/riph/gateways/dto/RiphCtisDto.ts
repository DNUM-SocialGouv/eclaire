export class RiphCtisDto {
  constructor(
        readonly etude_id: string,
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
        readonly phase_recherche: string,
        readonly domaine_therapeutique: string,
        readonly pathologies_maladies_rares: string,
        readonly informations_meddra: string,
        readonly portee_recherche: string,
        readonly tranches_age: string,
        readonly sexe: string,
        readonly groupes_sujet: string,
        readonly population_recrutement: string,
        readonly description_urgence: string,
        readonly date_debut_recrutement: string,
        readonly pays_concernes: string
  ) {}
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
