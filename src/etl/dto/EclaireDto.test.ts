import { EclaireDto } from './EclaireDto'
import { RiphDtoTestFactory } from '../../shared/test/helpers/RiphDtoTestFactory'

describe('etl | dto | EclaireDto', () => {
  it('should return a properly mapped eclaire dto when a riph ctis dto is given', () => {
    expect(EclaireDto.fromCtis(RiphDtoTestFactory.ctis())).toMatchInlineSnapshot(`
      EclaireDto {
        "contact_courriel": "global.rochegenentechtrials@roche.com",
        "contact_nom": "Trial Information Support Line-TISL, Switzerland",
        "contact_prenom": "Head of EU",
        "contact_public": Contact {
          "courriel": null,
          "nom": null,
          "prenom": null,
          "telephone": null,
        },
        "contact_telephone": "0041616881111",
        "criteres_eligibilite": [
          Critere {
            "titre": null,
            "type": null,
          },
          Critere {
            "titre": "TEST INCLUSION",
            "type": "INCLUSION",
          },
          Critere {
            "titre": "TEST EXCLUSION",
            "type": "EXCLUSION",
          },
        ],
        "criteres_jugement": [
          Critere {
            "titre": null,
            "type": null,
          },
          Critere {
            "titre": "TEST PRINCIPAL",
            "type": "PRINCIPAL",
          },
          Critere {
            "titre": "TEST SECONDAIRE",
            "type": "SECONDAIRE",
          },
        ],
        "date_debut_recrutement": "2022-06-30T00:00:00.000Z",
        "date_fin_recrutement": null,
        "date_theorique_maximale_autorisation_cpp": "2023-03-15",
        "dates_avis_favorable_ms_mns": "22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12",
        "domaine_therapeutique": "Diseases [C] - Neoplasms [C04]",
        "etat": "EN_COURS",
        "groupes_sujet": "Données non disponible",
        "historique": "2023-03-16:En cours",
        "informations_meddra": [
          "10070575",
          "10065430",
        ],
        "numero_primaire": "2022-500014-26-00",
        "objectifs": null,
        "organisme_adresse": "Grenzacherstrasse 124",
        "organisme_code_postal": "4058",
        "organisme_nom": "F. Hoffmann-La Roche AG",
        "organisme_pays": "Switzerland",
        "organisme_ville": "Basel Town",
        "pathologies_maladies_rares": "Locally-Advanced or Metastatic breast cancer (MBC)",
        "pays_concernes": [
          "BE",
          "DE",
          "ES",
          "FR",
          "HU",
          "IT",
          "PL",
          "PT",
        ],
        "phase_recherche": "Phase III",
        "population_recrutement": [
          "Women of child bearing potential not using contraception",
          "Women of child bearing potential using contraception",
        ],
        "precision_reglementation": "un essai clinique (CTIS)",
        "reglementation_code": "REG536",
        "resume": null,
        "sexe": [
          "Male",
          "Female",
        ],
        "sites": [
          Site {
            "adresse": "Avenue Eugene Avinee",
            "nom": "Aumar",
            "organisme": "Donnée non disponible",
            "prenom": "Madeleine",
            "service": "Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit",
            "titre": "Dr.",
            "ville": "Lille",
          },
        ],
        "statut_recrutement": "Recrutement en attente",
        "taille_etude": 21,
        "titre": "A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER",
        "tranches_age": [
          "65+ years",
          "18-64 years",
        ],
      }
    `)
  })

  it('should return a properly mapped eclaire dto when a riph dm dto is given', () => {
    expect(EclaireDto.fromDm(RiphDtoTestFactory.dm())).toMatchInlineSnapshot(`
      EclaireDto {
        "contact_courriel": null,
        "contact_nom": null,
        "contact_prenom": null,
        "contact_public": Contact {
          "courriel": null,
          "nom": null,
          "prenom": null,
          "telephone": null,
        },
        "contact_telephone": null,
        "criteres_eligibilite": [
          Critere {
            "titre": null,
            "type": null,
          },
          Critere {
            "titre": "TEST INCLUSION",
            "type": "INCLUSION",
          },
          Critere {
            "titre": "TEST EXCLUSION",
            "type": "EXCLUSION",
          },
        ],
        "criteres_jugement": [
          Critere {
            "titre": null,
            "type": null,
          },
          Critere {
            "titre": "TEST PRINCIPAL",
            "type": "PRINCIPAL",
          },
          Critere {
            "titre": "TEST SECONDAIRE",
            "type": "SECONDAIRE",
          },
        ],
        "date_debut_recrutement": null,
        "date_fin_recrutement": null,
        "date_theorique_maximale_autorisation_cpp": "2023-04-23",
        "dates_avis_favorable_ms_mns": "21.01155.000011-MS01:2021-11-09, 21.01155.000011-MS02:2022-03-09, 21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2022-11-29",
        "domaine_therapeutique": "Hépato-gastro-entérologie",
        "etat": "TERMINEE_ANTICIPEE",
        "groupes_sujet": null,
        "historique": "2023-04-06:Terminée",
        "informations_meddra": null,
        "numero_primaire": "2021-A01563-38",
        "objectifs": null,
        "organisme_adresse": "15 Boulevard du Général Leclerc",
        "organisme_code_postal": "59100",
        "organisme_nom": "Soladis Clinical Studies",
        "organisme_pays": "France",
        "organisme_ville": "Roubaix",
        "pathologies_maladies_rares": null,
        "pays_concernes": null,
        "phase_recherche": "N/A",
        "population_recrutement": [
          null,
        ],
        "precision_reglementation": "IC-Cas 4.2",
        "reglementation_code": "REG745",
        "resume": null,
        "sexe": [
          "unknown",
        ],
        "sites": [
          Site {
            "adresse": null,
            "nom": null,
            "organisme": null,
            "prenom": null,
            "service": null,
            "titre": null,
            "ville": null,
          },
        ],
        "statut_recrutement": "Recrutement en attente",
        "taille_etude": 96,
        "titre": "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
        "tranches_age": null,
      }
    `)
  })

  it('should not return an eclaire dto when dm publication is not authorised', () => {
    expect(EclaireDto.fromDm(RiphDtoTestFactory.dm({ publication_eclaire: 'non autorisé' }))).toBeNull()
  })

  it('should return a properly mapped eclaire dto when a riph jarde dto is given', () => {
    expect(EclaireDto.fromJarde(RiphDtoTestFactory.jarde())).toMatchInlineSnapshot(`
      EclaireDto {
        "contact_courriel": null,
        "contact_nom": null,
        "contact_prenom": null,
        "contact_public": Contact {
          "courriel": null,
          "nom": null,
          "prenom": null,
          "telephone": null,
        },
        "contact_telephone": null,
        "criteres_eligibilite": [
          Critere {
            "titre": null,
            "type": null,
          },
        ],
        "criteres_jugement": [
          Critere {
            "titre": null,
            "type": null,
          },
        ],
        "date_debut_recrutement": null,
        "date_fin_recrutement": null,
        "date_theorique_maximale_autorisation_cpp": "2023-04-30",
        "dates_avis_favorable_ms_mns": "20.00002.210204-MS02:2021-07-29, 20.00002.210204-MS03:2021-10-26, 20.00002.210204-MS04:2023-01-26",
        "domaine_therapeutique": "Autres",
        "etat": "EN_COURS",
        "groupes_sujet": null,
        "historique": "2023-04-04:En cours",
        "informations_meddra": null,
        "numero_primaire": "2021-A01022-39",
        "objectifs": null,
        "organisme_adresse": "LAMIH - Campus du Mont-Houy",
        "organisme_code_postal": "59313",
        "organisme_nom": "Université Polytechnique Hauts-de-France",
        "organisme_pays": "France",
        "organisme_ville": "Valenciennes",
        "pathologies_maladies_rares": null,
        "pays_concernes": null,
        "phase_recherche": "Phase I",
        "population_recrutement": [
          null,
        ],
        "precision_reglementation": "Catégorie 3",
        "reglementation_code": "JARDE",
        "resume": null,
        "sexe": [
          "unknown",
        ],
        "sites": [
          Site {
            "adresse": null,
            "nom": null,
            "organisme": null,
            "prenom": null,
            "service": null,
            "titre": null,
            "ville": null,
          },
        ],
        "statut_recrutement": "Recrutement en attente",
        "taille_etude": 23,
        "titre": "Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.",
        "tranches_age": null,
      }
    `)
  })

  it('should not return an eclaire dto when jarde publication is not authorised', () => {
    expect(EclaireDto.fromJarde(RiphDtoTestFactory.jarde({ publication_eclaire: 'non autorisé' }))).toBeNull()
  })
})
