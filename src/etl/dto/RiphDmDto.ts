export class RiphDmDto {
  constructor(
    readonly reglementation_code: string,
    readonly etat: string,
    readonly nom: string,
    readonly prenom: string,
    readonly courriel: string,
    readonly organisme: string,
    readonly adresse: string,
    readonly code_postal: string,
    readonly ville: string,
    readonly pays: string,
    readonly promoteur: string,
    readonly numero_national: string,
    readonly titre_recherche: string,
    readonly domaine_therapeutique: string,
    readonly taille_etude: number,
    readonly qualification: string,
    readonly recherche_ancillaire_ou_extension: boolean,
    readonly date_creation_etude: string
  ) {}
}
