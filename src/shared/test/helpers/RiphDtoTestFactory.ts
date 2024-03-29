import { RiphCtisDto } from '../../../etl/dto/RiphCtisDto'
import { RiphDmDto } from '../../../etl/dto/RiphDmDto'
import { RiphJardeDto } from '../../../etl/dto/RiphJardeDto'

export class RiphDtoTestFactory {
  static ctis(override?: Partial<RiphCtisDto>): RiphCtisDto {
    return {
      reglementation_code: 'REG536',
      etat: 'EN_COURS',
      organisme_nom: 'F. Hoffmann-La Roche AG',
      organisme_adresse: 'Grenzacherstrasse 124',
      organisme_code_postal: '4058',
      organisme_pays: 'Switzerland',
      organisme_ville: 'Basel Town',
      contact_nom: 'Trial Information Support Line-TISL, Switzerland',
      contact_prenom: 'Head of EU',
      contact_telephone: '0041616881111',
      contact_courriel: 'global.rochegenentechtrials@roche.com',
      sites: [
        {
          organisme: 'Donnée non disponible',
          adresse: 'Avenue Eugene Avinee',
          ville: 'Lille',
          titre: 'Dr.',
          nom: 'Aumar',
          prenom: 'Madeleine',
          service: 'Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit',
        },
      ],
      numero_ctis: '2022-500014-26-00',
      titre: 'A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER',
      intervention_faible: 'No',
      phase_recherche: 'Therapeutic confirmatory  (Phase III)',
      domaine_therapeutique: 'Diseases [C] - Neoplasms [C04]',
      pathologies_maladies_rares: 'Locally-Advanced or Metastatic breast cancer (MBC)',
      informations_meddra: '10070575, 10065430',
      taille_etude: 21,
      tranches_age: '65+ years, 18-64 years',
      sexe: 'Male,Female',
      groupes_sujet: 'Données non disponible',
      population_recrutement: 'Women of child bearing potential not using contraception, Women of child bearing potential using contraception',
      date_debut_recrutement: '2022-06-30',
      historique: '2023-03-16:En cours',
      dates_avis_favorable_ms_mns: '22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12',
      pays_concernes: 'BE, DE, ES, FR, HU, IT, PL, PT',
      ...override,
    }
  }

  static emptyCtis(): RiphCtisDto {
    return {
      reglementation_code: 'REG536',
      etat: 'A_DEMARRER',
      organisme_nom: null,
      organisme_adresse: null,
      organisme_code_postal: null,
      organisme_pays: null,
      organisme_ville: null,
      contact_nom: null,
      contact_prenom: null,
      contact_telephone: null,
      contact_courriel: null,
      sites: [
        {
          organisme: null,
          adresse: null,
          ville: null,
          titre: null,
          nom: null,
          prenom: null,
          service: null,
        },
      ],
      numero_ctis: '2022-500299-71-00',
      titre: null,
      intervention_faible: null,
      phase_recherche: null,
      domaine_therapeutique: null,
      pathologies_maladies_rares: null,
      informations_meddra: null,
      taille_etude: null,
      tranches_age: null,
      sexe: null,
      groupes_sujet: null,
      population_recrutement: null,
      date_debut_recrutement: null,
      historique: null,
      dates_avis_favorable_ms_mns: null,
      pays_concernes: null,
    }
  }

  static dm(override?: Partial<RiphDmDto>): RiphDmDto {
    return {
      reglementation_code: 'REG745',
      etat: 'TERMINEE_ANTICIPEE',
      deposant_promoteur: 'Promoteur institutionnel',
      deposant_nom: "D'HONDT",
      deposant_prenom: 'Olivier',
      deposant_courriel: 'cdp_scs@soladis.fr',
      deposant_organisme: 'Soladis Clinical Studies',
      deposant_adresse: '15 Boulevard du Général Leclerc',
      deposant_code_postal: '59100',
      deposant_ville: 'Roubaix',
      deposant_pays: 'France',
      numero_national: '2021-A01563-38',
      titre_recherche: "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
      domaine_therapeutique: 'Hépato-gastro-entérologie',
      taille_etude: 96,
      qualification: 'IC-Cas 4.2',
      historique: '2023-04-06:Terminée',
      dates_avis_favorable_ms_mns: '21.01155.000011-MS01:2021-11-09, 21.01155.000011-MS02:2022-03-09, 21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2022-11-29',
      date_soumission: '2023-01-12',

      ...override,
    }
  }

  static jarde(override?: Partial<RiphJardeDto>): RiphJardeDto {
    return {
      reglementation_code: 'JARDE',
      etat: 'EN_COURS',
      deposant_promoteur: 'Promoteur institutionnel',
      deposant_nom: 'GILLET',
      deposant_prenom: 'Christophe',
      deposant_courriel: 'christophe.gillet@uphf.fr',
      deposant_organisme: 'Université Polytechnique Hauts-de-France',
      deposant_adresse: 'LAMIH - Campus du Mont-Houy',
      deposant_code_postal: '59313',
      deposant_ville: 'Valenciennes',
      deposant_pays: 'France',
      numero_national: '2021-A01022-39',
      titre_recherche: 'Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.',
      domaine_therapeutique: 'Autres',
      taille_etude: 23,
      qualification_recherche: 'Catégorie 3',
      historique: '2023-04-04:En cours',
      dates_avis_favorable_ms_mns: '20.00002.210204-MS02:2021-07-29, 20.00002.210204-MS03:2021-10-26, 20.00002.210204-MS04:2023-01-26',
      competences: 'Essai de phase précoce, Oncologie, Thérapie cellulaire et génique',
      date_soumission: '2023-01-12',
      ...override,
    }
  }
}
