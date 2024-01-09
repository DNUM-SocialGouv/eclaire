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
    readonly numero_secondaire: string,
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
    readonly date_theorique_maximale_autorisation_cpp: string
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
      new Date('2023-03-15').toISOString().split('T')[0] // Date de mise en production de la gestion des historiques côté SIRIPH
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
      ModelUtils.UNAVAILABLE,
      riphDmDto.deposant_courriel,
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
      this.getMaxTheoreticalValidationDate(riphDmDto.date_soumission, 102)
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
      ModelUtils.UNAVAILABLE,
      riphJardeDto.deposant_courriel,
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
      this.getMaxTheoreticalValidationDate(riphJardeDto.date_soumission, 109)
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

type Phase = 'Phase I' | 'Phase I/Phase II' | 'Phase II' | 'Phase II/Phase III' | 'Phase III' | 'Phase III/Phase IV' | 'Phase IV' | 'N/A'

export type MedDra = Readonly<{
  code: string
  label: string
}>
