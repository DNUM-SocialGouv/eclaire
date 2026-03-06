import { EclaireDto } from './EclaireDto'
import { RiphDtoTestFactory } from '../../shared/test/helpers/RiphDtoTestFactory'

const SNAPSHOT_PATH_DM = '../../../shared/test/snapshots/EclaireDtoDM.snap.json'
const SNAPSHOT_PATH_JARDE = '../../../shared/test/snapshots/EclaireDtoJARDE.snap.json'

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
        "duree_participation": null,
        "etat": "EN_COURS",
        "groupes_sujet": "Données non disponible",
        "historique": "2023-03-16:En cours",
        "informations_meddra": [
          "10070575",
          "10065430",
        ],
        "numero_isrctn": null,
        "numero_libre": null,
        "numero_nct": null,
        "numero_primaire": "2022-500014-26-00",
        "numero_utn": null,
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
            "code_postal": "59350",
            "courriel": "test@sante.gouv",
            "nom": "Aumar",
            "organisme": "Donnée non disponible",
            "prenom": "Madeleine",
            "service": "Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit",
            "telephone": "0168496726",
            "titre": "Dr.",
            "ville": "Lille",
          },
        ],
        "statut_recrutement": "Recrutement en attente",
        "taille_etude": 21,
        "titre": "A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER",
        "to_delete": false,
        "tranches_age": [
          "65+ years",
          "18-64 years",
        ],
      }
    `)
  })

  it('should return a properly mapped eclaire dto when a riph dm dto is given', async() => {
    await expect(JSON.stringify(EclaireDto.fromDm(RiphDtoTestFactory.dm()))).toMatchFileSnapshot(SNAPSHOT_PATH_DM)
  })

  it('should contain to_delete: true when dm publication is not authorised', () => {
    expect(EclaireDto.fromDm(RiphDtoTestFactory.dm({ publication_eclaire: 'non autorisé' }))).toHaveProperty('to_delete', true)
  })

  it('should return a properly mapped eclaire dto when a riph jarde dto is given', async() => {
    await expect(JSON.stringify(EclaireDto.fromJarde(RiphDtoTestFactory.jarde()))).toMatchFileSnapshot(SNAPSHOT_PATH_JARDE)
  })

  it('should contain to_delete: true when jarde publication is not authorised', () => {
    expect(EclaireDto.fromJarde(RiphDtoTestFactory.jarde({ publication_eclaire: 'non autorisé' }))).toHaveProperty('to_delete', true)
  })
})
