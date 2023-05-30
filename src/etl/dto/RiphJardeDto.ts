export class RiphJardeDto {
  constructor(
    readonly reglementation_code: string,
    readonly etat: string,
    readonly deposant_nom: string,
    readonly deposant_prenom: string,
    readonly deposant_courriel: string,
    readonly deposant_organisme: string,
    readonly deposant_adresse: string,
    readonly deposant_code_postal: string,
    readonly deposant_ville: string,
    readonly deposant_pays: string,
    readonly deposant_promoteur: string,
    readonly numero_national: string,
    readonly titre_recherche: string,
    readonly domaine_therapeutique: string,
    readonly taille_etude: number,
    readonly competences: string,
    readonly qualification_recherche: string,
    readonly date_creation_etude: string,
    readonly historique: string,
    readonly dates_avis_favorable_ms_mns: string
  ) {}
}
