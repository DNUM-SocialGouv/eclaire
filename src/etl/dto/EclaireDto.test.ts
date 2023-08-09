import { expect } from 'vitest'

import { EclaireDto } from './EclaireDto'
import { riphCtisDto, riphDmDto, riphJardeDtoWithActiveStatus } from '../../shared/test/helpers/elasticsearchHelper'

describe('etl | dto | EclaireDto', () => {
  it('should return a properly mapped eclaire dto when a riph ctis dto is given', () => {
    expect(EclaireDto.fromCtis(riphCtisDto[0])).toMatchInlineSnapshot(`
        EclaireDto {
          "contact_courriel": "global.rochegenentechtrials@roche.com",
          "contact_nom": "Trial Information Support Line-TISL, Switzerland",
          "contact_prenom": "Head of EU",
          "contact_telephone": "0041616881111",
          "date_debut_recrutement": "2022-06-30",
          "dates_avis_favorable_ms_mns": "22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12",
          "domaine_therapeutique": "Diseases [C] - Neoplasms [C04]",
          "etat": "EN_COURS",
          "groupes_sujet": "Données non disponible",
          "historique": "2023-03-16:En cours",
          "informations_meddra": "10070575, 10065430",
          "intervention_faible": "No",
          "numero_ctis": "2022-500014-26-00",
          "organisme_adresse": "Grenzacherstrasse 124",
          "organisme_code_postal": "4058",
          "organisme_nom": "F. Hoffmann-La Roche AG",
          "organisme_pays": "Switzerland",
          "organisme_ville": "Basel Town",
          "pathologies_maladies_rares": "Locally-Advanced or Metastatic breast cancer (MBC)",
          "pays_concernes": "BE, DE, ES, FR, HU, IT, PL, PT",
          "phase_recherche": "Therapeutic confirmatory  (Phase III)",
          "population_recrutement": "Women of child bearing potential not using contraception, Women of child bearing potential using contraception",
          "reglementation_code": "REG536",
          "sexe": "Male,Female",
          "sites": [
            {
              "adresse": "Avenue Eugene Avinee",
              "nom": "Aumar",
              "organisme": "Donnée non disponible",
              "prenom": "Madeleine",
              "service": "Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit",
              "titre": "Dr.",
              "ville": "Lille",
            },
          ],
          "taille_etude": 21,
          "titre": "A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER",
          "tranches_age": "65+ years, 18-64 years",
        }
      `)
  })

  it('should return a properly mapped eclaire dto when a riph dm dto is given', () => {
    expect(EclaireDto.fromDm(riphDmDto[0])).toMatchInlineSnapshot(`
      EclaireDto {
        "contact_courriel": "cdp_scs@soladis.fr",
        "contact_nom": "D'HONDT",
        "contact_prenom": "Olivier",
        "contact_telephone": "INDISPONIBLE",
        "date_debut_recrutement": "NULL",
        "dates_avis_favorable_ms_mns": "21.01155.000011-MS01:2021-11-09, 21.01155.000011-MS02:2022-03-09, 21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2022-11-29",
        "domaine_therapeutique": "Hépato-gastro-entérologie",
        "etat": "TERMINEE_ANTICIPEE",
        "groupes_sujet": "INDISPONIBLE",
        "historique": "2023-04-06:Terminée",
        "informations_meddra": "INDISPONIBLE",
        "intervention_faible": "NULL",
        "numero_ctis": "2021-A01563-38",
        "organisme_adresse": "15 Boulevard du Général Leclerc",
        "organisme_code_postal": "59100",
        "organisme_nom": "Soladis Clinical Studies",
        "organisme_pays": "France",
        "organisme_ville": "Roubaix",
        "pathologies_maladies_rares": "INDISPONIBLE",
        "pays_concernes": "NULL",
        "phase_recherche": "NULL",
        "population_recrutement": "INDISPONIBLE",
        "reglementation_code": "REG745",
        "sexe": "NULL",
        "sites": [],
        "taille_etude": 96,
        "titre": "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
        "tranches_age": "INDISPONIBLE",
      }
    `)
  })

  it('should return a properly mapped eclaire dto when a riph jarde dto is given', () => {
    expect(EclaireDto.fromJarde(riphJardeDtoWithActiveStatus[0])).toMatchInlineSnapshot(`
      EclaireDto {
        "contact_courriel": "christophe.gillet@uphf.fr",
        "contact_nom": "GILLET",
        "contact_prenom": "Christophe",
        "contact_telephone": "INDISPONIBLE",
        "date_debut_recrutement": "NULL",
        "dates_avis_favorable_ms_mns": "20.00002.210204-MS02:2021-07-29, 20.00002.210204-MS03:2021-10-26, 20.00002.210204-MS04:2023-01-26",
        "domaine_therapeutique": "Autres",
        "etat": "EN_COURS",
        "groupes_sujet": "INDISPONIBLE",
        "historique": "2023-04-04:En cours",
        "informations_meddra": "INDISPONIBLE",
        "intervention_faible": "NULL",
        "numero_ctis": "2021-A01022-39",
        "organisme_adresse": "LAMIH - Campus du Mont-Houy",
        "organisme_code_postal": "59313",
        "organisme_nom": "Université Polytechnique Hauts-de-France",
        "organisme_pays": "France",
        "organisme_ville": "Valenciennes",
        "pathologies_maladies_rares": "INDISPONIBLE",
        "pays_concernes": "NULL",
        "phase_recherche": "NULL",
        "population_recrutement": "INDISPONIBLE",
        "reglementation_code": "JARDE",
        "sexe": "NULL",
        "sites": [],
        "taille_etude": 23,
        "titre": "Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.",
        "tranches_age": "INDISPONIBLE",
      }
    `)
  })
})
