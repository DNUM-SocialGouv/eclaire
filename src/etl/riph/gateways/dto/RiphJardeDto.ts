export class RiphJardeDto {
  constructor(
      readonly etude_id: number,
      readonly reglementation_code: string,
      readonly etat: string,
      readonly nom: string,
      readonly prenom: string,
      readonly courriel: string,
      readonly organisme: string,
      readonly adresse: string,
      readonly siret: string,
      readonly code_postal: string,
      readonly ville: string,
      readonly pays: string,
      readonly promoteur: string,
      readonly numero: string,
      readonly numero_national: string,
      readonly investigateur: string,
      readonly titre_recherche: string,
      readonly domaine_therapeutique: string,
      readonly competences: string,
      readonly caracteristiques_recherche: string,
      readonly recherche_ancillaire_ou_extension: boolean,
      readonly qualification_recherche: string,
      readonly date_soumission: string,
      readonly date_creation_etude: string,
      readonly date_previsionnelle_fin_etude: string
  ) {}
}
