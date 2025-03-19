import { expect } from 'vitest'

import { JsonFileReaderService } from './JsonFileReaderService'

describe('jsonFileReaderService', () => {
  it('should read the provided json file', () => {
    const fileName = 'sample.json'
    const sut = new JsonFileReaderService()
    const res = sut.read(fileName)
    expect(res).toMatchInlineSnapshot(`
      [
        {
          "contact_courriel": "test@2gmail.com",
          "contact_nom": "kask",
          "contact_prenom": "kalle",
          "contact_public_courriel": null,
          "contact_public_nom": null,
          "contact_public_prenom": null,
          "contact_public_telephone": null,
          "contact_telephone": "35234234",
          "criteres_eligibilite": [
            {
              "titre": null,
              "type": null,
            },
          ],
          "criteres_jugement": [
            {
              "titre": null,
              "type": null,
            },
          ],
          "date_debut_recrutement": null,
          "date_fin_etude": "2025-06-10",
          "date_fin_recrutement": null,
          "dates_avis_favorable_ms_mns": null,
          "description_urgence": null,
          "domaine_therapeutique": "Diseases [C] - Parasitic Diseases [C03]",
          "duree_participation": null,
          "etat": "A_DEMARRER",
          "etude_id": 5181,
          "groupes_sujet": "Données non disponible",
          "historique": "2025-01-18:À démarrer",
          "informations_meddra": "",
          "intervention_faible": "No",
          "numero_ctis": "2024-500030-33-00",
          "numero_isrctn": null,
          "numero_libre": null,
          "numero_nct": null,
          "numero_utn": null,
          "objectifs": null,
          "organisme_adresse": "Liivalaia 45",
          "organisme_code_postal": "10145",
          "organisme_nom": "Eesti Ravim OÜ",
          "organisme_pays": "Estonia",
          "organisme_ville": "",
          "participants_groupe_sujets": null,
          "participants_population_vulnerable": null,
          "participants_sexe": null,
          "participants_tranches_age": null,
          "pathologies_maladies_rares": "Medical condition(s)  test",
          "pays_concernes": "EE, FR",
          "phase_recherche": "Human Pharmacology (Phase I)- Bioequivalence Study",
          "population_recrutement": null,
          "portee_recherche": "Diagnosis",
          "publication_eclaire": "autorisé",
          "reglementation_code": "REG536",
          "resume": null,
          "sexe": "Male,Female",
          "sites": [
            {
              "adresse": "33 Rue de l'Industrie",
              "nom": "bhb",
              "organisme": "Bayer Healthcare S.A.S.",
              "prenom": "lknkln",
              "service": "dep",
              "titre": "",
              "ville": "Gaillard",
            },
          ],
          "sites_investigateurs": [
            {
              "adresse": null,
              "nom": null,
              "organisme": null,
              "prenom": null,
              "service": null,
              "titre_investigateur": null,
              "ville": null,
            },
          ],
          "statut_recrutement": "Recrutement en attente",
          "taille_etude": 6,
          "titre": "Kelly test trial 23.12.24, initial_chem_no_rms (keemiline toimeaine)",
          "tranches_age": "0-17 years",
        },
        {
          "contact_courriel": "test@2gmail.com",
          "contact_nom": "kask",
          "contact_prenom": "kalle",
          "contact_public_courriel": null,
          "contact_public_nom": null,
          "contact_public_prenom": null,
          "contact_public_telephone": null,
          "contact_telephone": "35234234",
          "criteres_eligibilite": [
            {
              "titre": null,
              "type": null,
            },
          ],
          "criteres_jugement": [
            {
              "titre": null,
              "type": null,
            },
          ],
          "date_debut_recrutement": null,
          "date_fin_etude": "2025-06-10",
          "date_fin_recrutement": null,
          "dates_avis_favorable_ms_mns": "25.00070-SM-1:2025-01-18",
          "description_urgence": null,
          "domaine_therapeutique": "Diseases [C] - Parasitic Diseases [C03]",
          "duree_participation": null,
          "etat": "A_DEMARRER",
          "etude_id": 5187,
          "groupes_sujet": "Données non disponible",
          "historique": "2025-01-18:À démarrer",
          "informations_meddra": "",
          "intervention_faible": "No",
          "numero_ctis": "2024-500055-40-00",
          "numero_isrctn": null,
          "numero_libre": null,
          "numero_nct": null,
          "numero_utn": null,
          "objectifs": null,
          "organisme_adresse": "Liivalaia 45",
          "organisme_code_postal": "10145",
          "organisme_nom": "Eesti Ravim OÜ",
          "organisme_pays": "Estonia",
          "organisme_ville": "",
          "participants_groupe_sujets": null,
          "participants_population_vulnerable": null,
          "participants_sexe": null,
          "participants_tranches_age": null,
          "pathologies_maladies_rares": "Medical condition(s)  test",
          "pays_concernes": "EE, FR",
          "phase_recherche": "Human Pharmacology (Phase I)- Bioequivalence Study",
          "population_recrutement": null,
          "portee_recherche": "Diagnosis",
          "publication_eclaire": "autorisé",
          "reglementation_code": "REG536",
          "resume": null,
          "sexe": "Male,Female",
          "sites": [
            {
              "adresse": "33 Rue de l'Industrie",
              "nom": "kjkj",
              "organisme": "Bayer Healthcare S.A.S.",
              "prenom": "hhb",
              "service": "dep",
              "titre": "",
              "ville": "Gaillard",
            },
          ],
          "sites_investigateurs": [
            {
              "adresse": null,
              "nom": null,
              "organisme": null,
              "prenom": null,
              "service": null,
              "titre_investigateur": null,
              "ville": null,
            },
          ],
          "statut_recrutement": "Recrutement en attente",
          "taille_etude": null,
          "titre": "Kelly test trial 27.12.24, initial_chem_no_rms (keemiline toimeaine)",
          "tranches_age": "0-17 years",
        },
      ]
    `)
  })
})
