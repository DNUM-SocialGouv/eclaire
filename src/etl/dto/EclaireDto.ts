import { RiphCtisDto } from './RiphCtisDto'
import { RiphDmDto } from './RiphDmDto'
import { RiphJardeDto } from './RiphJardeDto'
import { ModelUtils } from '../../shared/models/eclaire/ModelUtils'

export class EclaireDto {
  private constructor(
    readonly reglementation_code: string,
    readonly precision_reglementation: string,
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
    readonly numero_primaire: string,
    readonly titre: string,
    readonly phase_recherche: Phase,
    readonly domaine_therapeutique: string,
    readonly pathologies_maladies_rares: string,
    readonly informations_meddra: string[],
    readonly taille_etude: number,
    readonly tranches_age: string[],
    readonly sexe: string[],
    readonly groupes_sujet: string,
    readonly population_recrutement: string[],
    readonly date_debut_recrutement: string,
    readonly historique: string,
    readonly dates_avis_favorable_ms_mns: string,
    readonly pays_concernes: string[],
    readonly date_theorique_maximale_autorisation_cpp: string,
    readonly contact_public: Contact,
    readonly criteres_eligibilite: Critere[],
    readonly criteres_jugement: Critere[],
    readonly objectifs: string,
    readonly resume: string,
    readonly statut_recrutement: string,
    readonly date_fin_recrutement: string,
    readonly to_delete: boolean,
    readonly numero_nct: string,
    readonly numero_isrctn: string,
    readonly numero_utn: string,
    readonly numero_libre: string,
    readonly duree_participation: string
  ) { }

  static fromCtis(riphCtisDto: RiphCtisDto): EclaireDto {
    const sites = riphCtisDto.sites.map((site): Site => new Site(
      ModelUtils.decodeHtmlString(site.organisme),
      ModelUtils.decodeHtmlString(site.adresse),
      ModelUtils.decodeHtmlString(site.ville),
      ModelUtils.decodeHtmlString(site.titre),
      ModelUtils.decodeHtmlString(site.nom),
      ModelUtils.decodeHtmlString(site.prenom),
      ModelUtils.decodeHtmlString(site.service),
      ModelUtils.decodeHtmlString(site.code_postal),
      ModelUtils.decodeHtmlString(site.courriel),
      ModelUtils.decodeHtmlString(site.telephone)
    ))

    const listePhaseRecherche: Phase[] = riphCtisDto.phase_recherche?.match(/Phase (IV|III|II|I)/g) as Phase[]
    const phaseRecherche: Phase = listePhaseRecherche?.join('/') as Phase

    let precisionReglementation = riphCtisDto.intervention_faible
    if (riphCtisDto.intervention_faible === 'No') {
      precisionReglementation = 'un essai clinique (CTIS)'
    } else if (riphCtisDto.intervention_faible === 'Yes') {
      precisionReglementation = 'un essai clinique à faible intervention (CTIS)'
    }

    return new EclaireDto(
      riphCtisDto.reglementation_code,
      precisionReglementation,
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
      phaseRecherche || 'N/A',
      riphCtisDto.domaine_therapeutique,
      riphCtisDto.pathologies_maladies_rares,
      riphCtisDto.informations_meddra?.split(', ').map((code: string) => code) || null,
      riphCtisDto.taille_etude,
      riphCtisDto.tranches_age?.split(', ') || null,
      riphCtisDto.sexe?.split(',') || ['unknown'],
      riphCtisDto.groupes_sujet,
      riphCtisDto.population_recrutement?.split(', ') || null,
      riphCtisDto.date_debut_recrutement !== null ? new Date(riphCtisDto.date_debut_recrutement).toISOString() : null,
      riphCtisDto.historique,
      riphCtisDto.dates_avis_favorable_ms_mns,
      riphCtisDto.pays_concernes?.split(', ') || null,
      new Date('2023-03-15').toISOString().split('T')[0], // Date de mise en production de la gestion des historiques côté SIRIPH
      new Contact(
        riphCtisDto.contact_public_nom,
        riphCtisDto.contact_public_prenom,
        riphCtisDto.contact_public_courriel,
        riphCtisDto.contact_public_telephone
      ),
      riphCtisDto.criteres_eligibilite.map((criteria) => new Critere(criteria.titre, criteria.type)),
      riphCtisDto.criteres_jugement.map((criteria) => new Critere(criteria.titre, criteria.type)),
      riphCtisDto.objectifs,
      riphCtisDto.resume,
      riphCtisDto.statut_recrutement,
      riphCtisDto.date_fin_recrutement,
      riphCtisDto.publication_eclaire !== 'autorisé',
      riphCtisDto.numero_nct,
      riphCtisDto.numero_isrctn,
      riphCtisDto.numero_utn,
      riphCtisDto.numero_libre,
      riphCtisDto.duree_participation
    )
  }

  static fromDm(riphDmDto: RiphDmDto): EclaireDto {
    return new EclaireDto(
      riphDmDto.reglementation_code,
      riphDmDto.qualification,
      riphDmDto.etat,
      riphDmDto.deposant_organisme,
      riphDmDto.deposant_adresse,
      riphDmDto.deposant_code_postal,
      riphDmDto.deposant_pays,
      riphDmDto.deposant_ville,
      riphDmDto.deposant_nom,
      riphDmDto.deposant_prenom,
      null,
      riphDmDto.deposant_courriel,
      riphDmDto.sites_investigateurs.map((site_investigateur) => new Site(
        ModelUtils.decodeHtmlString(site_investigateur.organisme),
        ModelUtils.decodeHtmlString(site_investigateur.adresse),
        ModelUtils.decodeHtmlString(site_investigateur.ville),
        ModelUtils.decodeHtmlString(site_investigateur.titre_investigateur),
        ModelUtils.decodeHtmlString(site_investigateur.nom),
        ModelUtils.decodeHtmlString(site_investigateur.prenom),
        ModelUtils.decodeHtmlString(site_investigateur.service),
        ModelUtils.decodeHtmlString(site_investigateur.code_postal),
        ModelUtils.decodeHtmlString(site_investigateur.courriel),
        ModelUtils.decodeHtmlString(site_investigateur.telephone)
      )),
      riphDmDto.numero_national,
      riphDmDto.titre_recherche,
      'N/A',
      riphDmDto.domaine_therapeutique,
      null,
      null,
      riphDmDto.taille_etude,
      riphDmDto.participants_tranches_age?.split(', ') || null,
      riphDmDto.participants_sexe?.split(',') || ['unknown'],
      riphDmDto.participants_groupe_sujets,
      [riphDmDto.participants_population_vulnerable],
      riphDmDto.date_debut_recrutement !== null ? new Date(riphDmDto.date_debut_recrutement).toISOString() : null,
      riphDmDto.historique,
      riphDmDto.dates_avis_favorable_ms_mns,
      null,
      this.getMaxTheoreticalValidationDate(riphDmDto.date_soumission, 102),
      new Contact(
        riphDmDto.contact_public_nom,
        riphDmDto.contact_public_prenom,
        riphDmDto.contact_public_courriel,
        riphDmDto.contact_public_telephone
      ),
      riphDmDto.criteres_eligibilite.map((criteria) => new Critere(criteria.titre, criteria.type)),
      riphDmDto.criteres_jugement.map((criteria) => new Critere(criteria.titre, criteria.type)),
      riphDmDto.objectifs,
      riphDmDto.resume,
      riphDmDto.statut_recrutement,
      riphDmDto.date_fin_recrutement,
      riphDmDto.publication_eclaire !== 'autorisé',
      riphDmDto.numero_nct,
      riphDmDto.numero_isrctn,
      riphDmDto.numero_utn,
      riphDmDto.numero_libre,
      riphDmDto.duree_participation
    )
  }

  private static getMaxTheoreticalValidationDate(date_soumission: string, maximalValidationDelayFromCpp: number): string {
    const date = new Date(date_soumission)
    const submissionDateAddedToMaximalValidationDelay: number = date.getDate() + maximalValidationDelayFromCpp
    date.setDate(submissionDateAddedToMaximalValidationDelay)
    return date.toISOString().split('T')[0]
  }

  static fromJarde(riphJardeDto: RiphJardeDto): EclaireDto {
    const phaseRecherche: Phase = riphJardeDto.competences?.includes('Essai de phase précoce') ? 'Phase I' : 'N/A'
    return new EclaireDto(
      riphJardeDto.reglementation_code,
      riphJardeDto.qualification_recherche,
      riphJardeDto.etat,
      riphJardeDto.deposant_organisme,
      riphJardeDto.deposant_adresse,
      riphJardeDto.deposant_code_postal,
      riphJardeDto.deposant_pays,
      riphJardeDto.deposant_ville,
      riphJardeDto.deposant_nom,
      riphJardeDto.deposant_prenom,
      null,
      riphJardeDto.deposant_courriel,
      riphJardeDto.sites_investigateurs.map((site_investigateur) => new Site(
        ModelUtils.decodeHtmlString(site_investigateur.organisme),
        ModelUtils.decodeHtmlString(site_investigateur.adresse),
        ModelUtils.decodeHtmlString(site_investigateur.ville),
        ModelUtils.decodeHtmlString(site_investigateur.titre_investigateur),
        ModelUtils.decodeHtmlString(site_investigateur.nom),
        ModelUtils.decodeHtmlString(site_investigateur.prenom),
        ModelUtils.decodeHtmlString(site_investigateur.service),
        ModelUtils.decodeHtmlString(site_investigateur.code_postal),
        ModelUtils.decodeHtmlString(site_investigateur.courriel),
        ModelUtils.decodeHtmlString(site_investigateur.telephone)
      )),
      riphJardeDto.numero_national,
      riphJardeDto.titre_recherche,
      phaseRecherche,
      riphJardeDto.domaine_therapeutique,
      null,
      null,
      riphJardeDto.taille_etude,
      riphJardeDto.participants_tranches_age?.split(', ') || null,
      riphJardeDto.participants_sexe?.split(',') || ['unknown'],
      riphJardeDto.participants_groupe_sujets,
      [riphJardeDto.participants_population_vulnerable],
      riphJardeDto.date_debut_recrutement !== null ? new Date(riphJardeDto.date_debut_recrutement).toISOString() : null,
      riphJardeDto.historique,
      riphJardeDto.dates_avis_favorable_ms_mns,
      null,
      this.getMaxTheoreticalValidationDate(riphJardeDto.date_soumission, 109),
      new Contact(
        riphJardeDto.contact_public_nom,
        riphJardeDto.contact_public_prenom,
        riphJardeDto.contact_public_courriel,
        riphJardeDto.contact_public_telephone
      ),
      riphJardeDto.criteres_eligibilite.map((criteria) => new Critere(criteria.titre, criteria.type)),
      riphJardeDto.criteres_jugement.map((criteria) => new Critere(criteria.titre, criteria.type)),
      riphJardeDto.objectifs,
      riphJardeDto.resume,
      riphJardeDto.statut_recrutement,
      riphJardeDto.date_fin_recrutement,
      riphJardeDto.publication_eclaire !== 'autorisé',
      riphJardeDto.numero_nct,
      riphJardeDto.numero_isrctn,
      riphJardeDto.numero_utn,
      riphJardeDto.numero_libre,
      riphJardeDto.duree_participation
    )
  }

  toHtml(): string {
    const sites = this.sites?.map((site: Site) => site.toString()).toString()
    const criteresEligibilite = this.criteres_eligibilite?.map((crit: Critere) => crit.toString()).toString()
    const criteresJugement = this.criteres_jugement?.map((crit: Critere) => crit.toString()).toString()
    return `<h2>Données reçues avant modélisation FHIR</h2><ul><li> reglementation_code: ${this.reglementation_code} </li><li> precision_reglementation: ${this.precision_reglementation} </li><li> etat: ${this.etat} </li><li> organisme_nom: ${this.organisme_nom} </li><li> organisme_adresse: ${this.organisme_adresse} </li><li> organisme_code_postal: ${this.organisme_code_postal} </li><li> organisme_pays: ${this.organisme_pays} </li><li> organisme_ville: ${this.organisme_ville} </li><li> contact_nom: ${this.contact_nom} </li><li> contact_prenom: ${this.contact_prenom} </li><li> contact_telephone: ${this.contact_telephone} </li><li> contact_courriel: ${this.contact_courriel} </li><li> sites: ${sites} </li><li> numero_primaire: ${this.numero_primaire} </li><li> titre: ${this.titre} </li><li> phase_recherche: ${this.phase_recherche} </li><li> domaine_therapeutique: ${this.domaine_therapeutique} </li><li> pathologies_maladies_rares: ${this.pathologies_maladies_rares} </li><li> informations_meddra: ${this.informations_meddra?.toString()} </li><li> taille_etude: ${this.taille_etude} </li><li> tranches_age: ${this.tranches_age?.toString()} </li><li> sexe: ${this.sexe?.toString()} </li><li> groupes_sujet: ${this.groupes_sujet} </li><li> population_recrutement: ${this.population_recrutement?.toString()} </li><li> date_debut_recrutement: ${this.date_debut_recrutement} </li><li> historique: ${this.historique} </li><li> dates_avis_favorable_ms_mns: ${this.dates_avis_favorable_ms_mns} </li><li> pays_concernes: ${this.pays_concernes?.toString()} </li><li> date_theorique_maximale_autorisation_cpp: ${this.date_theorique_maximale_autorisation_cpp} </li><li> contact_public: ${this.contact_public?.toString()} </li><li> criteres_eligibilite: ${criteresEligibilite} </li><li> criteres_jugement: ${criteresJugement} </li><li> objectifs: ${this.objectifs} </li><li> resume: ${this.resume} </li><li> statut_recrutement: ${this.statut_recrutement} </li><li> date_fin_recrutement: ${this.date_fin_recrutement} </li></ul>`
  }
}

class Contact {
  constructor(
    readonly nom: string,
    readonly prenom: string,
    readonly courriel: string,
    readonly telephone: string
  ) { }

  toString() {
    return `Nom: ${this.nom} - Prenom: ${this.prenom} Courriel: ${this.courriel} Tel: ${this.telephone}`
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
    readonly service: string,
    readonly code_postal: string,
    readonly courriel: string,
    readonly telephone: string
  ) { }

  toString() {
    return `Organisme: ${this.organisme} - Adresse: ${this.adresse} - Ville: ${this.ville} - Titre: ${this.titre} - Nom: ${this.nom} - Prenom: ${this.prenom} - Service: ${this.service} - Code_postale: ${this.code_postal} - courriel: ${this.courriel} - telephone: ${this.telephone}`
  }
}

export class Critere {
  constructor(
    readonly titre: string,
    readonly type: string
  ) { }

  toString() {
    return `Titre: ${this.titre} - Type: ${this.type}`
  }
}

type Phase = 'Phase I' | 'Phase I/Phase II' | 'Phase II' | 'Phase II/Phase III' | 'Phase III' | 'Phase III/Phase IV' | 'Phase IV' | 'N/A'

export type MedDra = Readonly<{
  code: string
  label: string
}>
