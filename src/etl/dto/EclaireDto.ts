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
    readonly portee_recherche: string,
    readonly description_urgence: string,
    readonly date_fin_etude: string,
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
    readonly date_fin_recrutement: string,
    readonly sites_investigateurs: Site[]
  ) {}

  static fromCtis(riphCtisDto: RiphCtisDto): EclaireDto {
    if (riphCtisDto.publication_eclaire !== 'autorisé') {
      return null
    }

    const sites = riphCtisDto.sites.map((site): Site => new Site(
      site.organisme,
      site.adresse,
      site.ville,
      site.titre,
      site.nom,
      site.prenom,
      site.service
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
      riphCtisDto.portee_recherche,
      riphCtisDto.description_urgence,
      riphCtisDto.date_fin_etude,
      riphCtisDto.contact_public_nom,
      riphCtisDto.contact_public_prenom,
      riphCtisDto.contact_public_courriel,
      riphCtisDto.contact_public_telephone,
      riphCtisDto.criteres_eligibilite,
      riphCtisDto.criteres_jugement,
      riphCtisDto.publication_eclaire,
      riphCtisDto.numero_nct,
      riphCtisDto.numero_isrctn,
      riphCtisDto.numero_utn,
      riphCtisDto.numero_libre,
      riphCtisDto.objectifs,
      riphCtisDto.resume,
      riphCtisDto.duree_participation,
      riphCtisDto.participants_sexe,
      riphCtisDto.participants_tranches_age,
      riphCtisDto.participants_groupe_sujets,
      riphCtisDto.participants_population_vulnerable,
      riphCtisDto.statut_recrutement,
      riphCtisDto.date_fin_recrutement,
      riphCtisDto.sites_investigateurs.map((site) => {
        return {
          adresse: site.adresse,
          nom: site.nom,
          organisme: site.organisme,
          prenom: site.prenom,
          service: site.service,
          titre: site.titre_investigateur,
          ville: site.ville,
        }
      })
    )
  }

  static fromDm(riphDmDto: RiphDmDto): EclaireDto {
    if (riphDmDto.publication_eclaire !== 'autorisé') {
      return null
    }
    return new EclaireDto(
      riphDmDto.reglementation_code,
      riphDmDto.qualification,
      riphDmDto.etat,
      riphDmDto.deposant_organisme,
      riphDmDto.deposant_adresse,
      riphDmDto.deposant_code_postal,
      riphDmDto.deposant_pays,
      riphDmDto.deposant_ville,
      null,
      null,
      null,
      null,
      ModelUtils.EMPTY_ARRAY_IN_SOURCE,
      riphDmDto.numero_national,
      riphDmDto.titre_recherche,
      'N/A',
      riphDmDto.domaine_therapeutique,
      ModelUtils.UNAVAILABLE,
      null,
      riphDmDto.taille_etude,
      null,
      null,
      ModelUtils.UNAVAILABLE,
      null,
      null,
      riphDmDto.historique,
      riphDmDto.dates_avis_favorable_ms_mns,
      null,
      this.getMaxTheoreticalValidationDate(riphDmDto.date_soumission, 102),
      null,
      null,
      null,
      riphDmDto.contact_public_nom,
      riphDmDto.contact_public_prenom,
      riphDmDto.contact_public_courriel,
      riphDmDto.contact_public_telephone,
      riphDmDto.criteres_eligibilite,
      riphDmDto.criteres_jugement,
      riphDmDto.publication_eclaire,
      riphDmDto.numero_nct,
      riphDmDto.numero_isrctn,
      riphDmDto.numero_utn,
      riphDmDto.numero_libre,
      riphDmDto.objectifs,
      riphDmDto.resume,
      riphDmDto.duree_participation,
      riphDmDto.participants_sexe,
      riphDmDto.participants_tranches_age,
      riphDmDto.participants_groupe_sujets,
      riphDmDto.participants_population_vulnerable,
      riphDmDto.statut_recrutement,
      riphDmDto.date_fin_recrutement,
      riphDmDto.sites_investigateurs.map((site) => {
        return {
          adresse: site.adresse,
          nom: site.nom,
          organisme: site.organisme,
          prenom: site.prenom,
          service: site.service,
          titre: site.titre_investigateur,
          ville: site.ville,
        }
      })
    )
  }

  private static getMaxTheoreticalValidationDate(date_soumission: string, maximalValidationDelayFromCpp: number): string {
    const date = new Date(date_soumission)
    const submissionDateAddedToMaximalValidationDelay: number = date.getDate() + maximalValidationDelayFromCpp
    date.setDate(submissionDateAddedToMaximalValidationDelay)
    return date.toISOString().split('T')[0]
  }

  static fromJarde(riphJardeDto: RiphJardeDto): EclaireDto {
    if (riphJardeDto.publication_eclaire !== 'autorisé') {
      return null
    }
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
      null,
      null,
      null,
      null,
      ModelUtils.EMPTY_ARRAY_IN_SOURCE,
      riphJardeDto.numero_national,
      riphJardeDto.titre_recherche,
      phaseRecherche,
      riphJardeDto.domaine_therapeutique,
      ModelUtils.UNAVAILABLE,
      null,
      riphJardeDto.taille_etude,
      null,
      null,
      ModelUtils.UNAVAILABLE,
      null,
      null,
      riphJardeDto.historique,
      riphJardeDto.dates_avis_favorable_ms_mns,
      null,
      this.getMaxTheoreticalValidationDate(riphJardeDto.date_soumission, 109),
      null,
      null,
      null,
      riphJardeDto.contact_public_nom,
      riphJardeDto.contact_public_prenom,
      riphJardeDto.contact_public_courriel,
      riphJardeDto.contact_public_telephone,
      riphJardeDto.criteres_eligibilite,
      riphJardeDto.criteres_jugement,
      riphJardeDto.publication_eclaire,
      riphJardeDto.numero_nct,
      riphJardeDto.numero_isrctn,
      riphJardeDto.numero_utn,
      riphJardeDto.numero_libre,
      riphJardeDto.objectifs,
      riphJardeDto.resume,
      riphJardeDto.duree_participation,
      riphJardeDto.participants_sexe,
      riphJardeDto.participants_tranches_age,
      riphJardeDto.participants_groupe_sujets,
      riphJardeDto.participants_population_vulnerable,
      riphJardeDto.statut_recrutement,
      riphJardeDto.date_fin_recrutement,
      riphJardeDto.sites_investigateurs.map((site) => {
        return {
          adresse: site.adresse,
          nom: site.nom,
          organisme: site.organisme,
          prenom: site.prenom,
          service: site.service,
          titre: site.titre_investigateur,
          ville: site.ville,
        }
      })
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

class Critere {
  private constructor(
    readonly titre: string,
    readonly type: string
  ) {
  }
}

type Phase = 'Phase I' | 'Phase I/Phase II' | 'Phase II' | 'Phase II/Phase III' | 'Phase III' | 'Phase III/Phase IV' | 'Phase IV' | 'N/A'

export type MedDra = Readonly<{
  code: string
  label: string
}>
