export class RiphJardeDto {
  private constructor(
    readonly reglementation_code: string,
    readonly etat: string,
    readonly type_promoteur: string,
    readonly deposant_nom: string,
    readonly deposant_prenom: string,
    readonly deposant_courriel: string,
    readonly deposant_organisme: string,
    readonly deposant_adresse: string,
    readonly deposant_siret: string,
    readonly deposant_code_postal: string,
    readonly deposant_ville: string,
    readonly deposant_pays: string,
    readonly is_mandataire: boolean,
    readonly promoteur_nom: string,
    readonly promoteur_prenom: string,
    readonly promoteur_email: string,
    readonly promoteur_organisme: string,
    readonly promoteur_adresse: string,
    readonly promoteur_siret: string,
    readonly promoteur_code_postal: string,
    readonly promoteur_ville: string,
    readonly promoteur_pays: string,
    readonly mandataire_nom: string,
    readonly mandataire_prenom: string,
    readonly mandataire_email: string,
    readonly mandataire_organisme: string,
    readonly mandataire_adresse: string,
    readonly mandataire_siret: string,
    readonly mandataire_code_postal: string,
    readonly mandataire_ville: string,
    readonly mandataire_pays: string,
    readonly numero: string,
    readonly numero_national: string,
    readonly investigateur: string,
    readonly titre_recherche: string,
    readonly domaine_therapeutique: string,
    readonly taille_etude: number,
    readonly competences: string,
    readonly caracteristiques_recherche: string,
    readonly recherche_ancillaire_ou_extension: boolean,
    readonly qualification_recherche: string,
    readonly date_soumission: string,
    readonly date_creation_etude: string,
    readonly date_previsionnelle_fin_etude: string,
    readonly historique: string,
    readonly dates_avis_favorable_ms_mns: string,
    readonly contact_public_nom: string,
    readonly contact_public_prenom: string,
    readonly contact_public_courriel: string,
    readonly contact_public_telephone: string,
    readonly criteres_eligibilite: [
      {
        readonly titre: string,
        readonly type: string
      }
    ],
    readonly criteres_jugement: [
      {
        readonly titre: string,
        readonly type: string
      }
    ],
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
    readonly date_debut_recrutement: string,
    readonly date_fin_recrutement: string,
    readonly sites_investigateurs: [
      {
        readonly organisme: string,
        readonly adresse: string,
        readonly ville: string,
        readonly titre_investigateur: string,
        readonly nom: string,
        readonly prenom: string,
        readonly service: string
      }
    ]
  ) {
  }
}
