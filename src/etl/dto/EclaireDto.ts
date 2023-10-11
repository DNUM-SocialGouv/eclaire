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
    readonly intervention_faible: string,
    readonly phase_recherche: Phase,
    readonly domaine_therapeutique: string,
    readonly pathologies_maladies_rares: string,
    readonly informations_meddra: MedDra[],
    readonly taille_etude: number,
    readonly tranches_age: string,
    readonly sexe: string,
    readonly groupes_sujet: string,
    readonly population_recrutement: string[],
    readonly date_debut_recrutement: string,
    readonly historique: string,
    readonly dates_avis_favorable_ms_mns: string,
    readonly pays_concernes: string
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

    return new EclaireDto(
      riphCtisDto.reglementation_code,
      riphCtisDto.intervention_faible,
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
      riphCtisDto.intervention_faible,
      phaseRecherche,
      riphCtisDto.domaine_therapeutique,
      riphCtisDto.pathologies_maladies_rares,
      riphCtisDto.informations_meddra?.split(', ')
        .map((code: string): MedDra => {
          return {
            code,
            label: 'N/A',
          }
        }) || null,
      riphCtisDto.taille_etude,
      riphCtisDto.tranches_age,
      riphCtisDto.sexe,
      riphCtisDto.groupes_sujet,
      riphCtisDto.population_recrutement?.split(', ') || null,
      riphCtisDto.date_debut_recrutement,
      riphCtisDto.historique,
      riphCtisDto.dates_avis_favorable_ms_mns,
      riphCtisDto.pays_concernes
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
      null,
      null,
      riphDmDto.domaine_therapeutique,
      ModelUtils.UNAVAILABLE,
      [
        {
          code: ModelUtils.UNAVAILABLE,
          label: 'N/A',
        },
      ],
      riphDmDto.taille_etude,
      ModelUtils.UNAVAILABLE,
      null,
      ModelUtils.UNAVAILABLE,
      null,
      null,
      riphDmDto.historique,
      riphDmDto.dates_avis_favorable_ms_mns,
      null
    )
  }

  static fromJarde(riphJardeDto: RiphJardeDto): EclaireDto {
    const phaseRecherche: Phase = riphJardeDto.competences?.includes('Essai de phase précoce') ? 'Phase I' : null
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
      null,
      phaseRecherche,
      riphJardeDto.domaine_therapeutique,
      ModelUtils.UNAVAILABLE,
      [
        {
          code: ModelUtils.UNAVAILABLE,
          label: 'N/A',
        },
      ],
      riphJardeDto.taille_etude,
      ModelUtils.UNAVAILABLE,
      null,
      ModelUtils.UNAVAILABLE,
      null,
      null,
      riphJardeDto.historique,
      riphJardeDto.dates_avis_favorable_ms_mns,
      null
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

type Phase = 'Phase I' | 'Phase I/Phase II' | 'Phase II' | 'Phase II/Phase III' | 'Phase III' | 'Phase III/Phase IV' | 'Phase IV'

export type MedDra = Readonly<{
  code: string
  label: string
}>
