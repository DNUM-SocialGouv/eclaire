import { afterEach } from 'vitest'

import { IngestPipelineCtis } from './IngestPipelineCtis'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../../shared/test/helpers/RiphDtoTestFactory'
import { RiphCtisDto } from '../../dto/RiphCtisDto'

describe('etl | IngestPipelineCtis', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphCtisDtos = [RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis()]
      const { ingestPipelineCtis, readerService } = setup()
      vi.spyOn(readerService, 'read').mockResolvedValueOnce(riphCtisDtos)

      // when
      const result = await ingestPipelineCtis.extract<RiphCtisDto>()

      // then
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "contact_courriel": "global.rochegenentechtrials@roche.com",
            "contact_nom": "Trial Information Support Line-TISL, Switzerland",
            "contact_prenom": "Head of EU",
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
            "contact_telephone": "0041616881111",
            "criteres_eligibilite": [
              {
                "titre": null,
                "type": null,
              },
              {
                "titre": "TEST INCLUSION",
                "type": "INCLUSION",
              },
              {
                "titre": "TEST EXCLUSION",
                "type": "EXCLUSION",
              },
            ],
            "criteres_jugement": [
              {
                "titre": null,
                "type": null,
              },
              {
                "titre": "TEST PRINCIPAL",
                "type": "PRINCIPAL",
              },
              {
                "titre": "TEST SECONDAIRE",
                "type": "SECONDAIRE",
              },
            ],
            "date_debut_recrutement": "2022-06-30",
            "date_fin_etude": "2025-06-10",
            "date_fin_recrutement": null,
            "dates_avis_favorable_ms_mns": "22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12",
            "description_urgence": null,
            "domaine_therapeutique": "Diseases [C] - Neoplasms [C04]",
            "duree_participation": null,
            "etat": "EN_COURS",
            "groupes_sujet": "Données non disponible",
            "historique": "2023-03-16:En cours",
            "informations_meddra": "10070575, 10065430",
            "intervention_faible": "No",
            "numero_ctis": "2022-500014-26-00",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_nct": null,
            "numero_utn": null,
            "objectifs": null,
            "organisme_adresse": "Grenzacherstrasse 124",
            "organisme_code_postal": "4058",
            "organisme_nom": "F. Hoffmann-La Roche AG",
            "organisme_pays": "Switzerland",
            "organisme_ville": "Basel Town",
            "participants_groupe_sujets": null,
            "participants_population_vulnerable": null,
            "participants_sexe": null,
            "participants_tranches_age": null,
            "pathologies_maladies_rares": "Locally-Advanced or Metastatic breast cancer (MBC)",
            "pays_concernes": "BE, DE, ES, FR, HU, IT, PL, PT",
            "phase_recherche": "Therapeutic confirmatory  (Phase III)",
            "population_recrutement": "Women of child bearing potential not using contraception, Women of child bearing potential using contraception",
            "portee_recherche": "Diagnosis",
            "publication_eclaire": "autorisé",
            "reglementation_code": "REG536",
            "resume": null,
            "sexe": "Male,Female",
            "sites_investigateurs": [
              {
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
            "tranches_age": "65+ years, 18-64 years",
          },
          {
            "contact_courriel": "global.rochegenentechtrials@roche.com",
            "contact_nom": "Trial Information Support Line-TISL, Switzerland",
            "contact_prenom": "Head of EU",
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
            "contact_telephone": "0041616881111",
            "criteres_eligibilite": [
              {
                "titre": null,
                "type": null,
              },
              {
                "titre": "TEST INCLUSION",
                "type": "INCLUSION",
              },
              {
                "titre": "TEST EXCLUSION",
                "type": "EXCLUSION",
              },
            ],
            "criteres_jugement": [
              {
                "titre": null,
                "type": null,
              },
              {
                "titre": "TEST PRINCIPAL",
                "type": "PRINCIPAL",
              },
              {
                "titre": "TEST SECONDAIRE",
                "type": "SECONDAIRE",
              },
            ],
            "date_debut_recrutement": "2022-06-30",
            "date_fin_etude": "2025-06-10",
            "date_fin_recrutement": null,
            "dates_avis_favorable_ms_mns": "22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12",
            "description_urgence": null,
            "domaine_therapeutique": "Diseases [C] - Neoplasms [C04]",
            "duree_participation": null,
            "etat": "EN_COURS",
            "groupes_sujet": "Données non disponible",
            "historique": "2023-03-16:En cours",
            "informations_meddra": "10070575, 10065430",
            "intervention_faible": "No",
            "numero_ctis": "2022-500014-26-00",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_nct": null,
            "numero_utn": null,
            "objectifs": null,
            "organisme_adresse": "Grenzacherstrasse 124",
            "organisme_code_postal": "4058",
            "organisme_nom": "F. Hoffmann-La Roche AG",
            "organisme_pays": "Switzerland",
            "organisme_ville": "Basel Town",
            "participants_groupe_sujets": null,
            "participants_population_vulnerable": null,
            "participants_sexe": null,
            "participants_tranches_age": null,
            "pathologies_maladies_rares": "Locally-Advanced or Metastatic breast cancer (MBC)",
            "pays_concernes": "BE, DE, ES, FR, HU, IT, PL, PT",
            "phase_recherche": "Therapeutic confirmatory  (Phase III)",
            "population_recrutement": "Women of child bearing potential not using contraception, Women of child bearing potential using contraception",
            "portee_recherche": "Diagnosis",
            "publication_eclaire": "autorisé",
            "reglementation_code": "REG536",
            "resume": null,
            "sexe": "Male,Female",
            "sites_investigateurs": [
              {
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
            "tranches_age": "65+ years, 18-64 years",
          },
          {
            "contact_courriel": "global.rochegenentechtrials@roche.com",
            "contact_nom": "Trial Information Support Line-TISL, Switzerland",
            "contact_prenom": "Head of EU",
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
            "contact_telephone": "0041616881111",
            "criteres_eligibilite": [
              {
                "titre": null,
                "type": null,
              },
              {
                "titre": "TEST INCLUSION",
                "type": "INCLUSION",
              },
              {
                "titre": "TEST EXCLUSION",
                "type": "EXCLUSION",
              },
            ],
            "criteres_jugement": [
              {
                "titre": null,
                "type": null,
              },
              {
                "titre": "TEST PRINCIPAL",
                "type": "PRINCIPAL",
              },
              {
                "titre": "TEST SECONDAIRE",
                "type": "SECONDAIRE",
              },
            ],
            "date_debut_recrutement": "2022-06-30",
            "date_fin_etude": "2025-06-10",
            "date_fin_recrutement": null,
            "dates_avis_favorable_ms_mns": "22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12",
            "description_urgence": null,
            "domaine_therapeutique": "Diseases [C] - Neoplasms [C04]",
            "duree_participation": null,
            "etat": "EN_COURS",
            "groupes_sujet": "Données non disponible",
            "historique": "2023-03-16:En cours",
            "informations_meddra": "10070575, 10065430",
            "intervention_faible": "No",
            "numero_ctis": "2022-500014-26-00",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_nct": null,
            "numero_utn": null,
            "objectifs": null,
            "organisme_adresse": "Grenzacherstrasse 124",
            "organisme_code_postal": "4058",
            "organisme_nom": "F. Hoffmann-La Roche AG",
            "organisme_pays": "Switzerland",
            "organisme_ville": "Basel Town",
            "participants_groupe_sujets": null,
            "participants_population_vulnerable": null,
            "participants_sexe": null,
            "participants_tranches_age": null,
            "pathologies_maladies_rares": "Locally-Advanced or Metastatic breast cancer (MBC)",
            "pays_concernes": "BE, DE, ES, FR, HU, IT, PL, PT",
            "phase_recherche": "Therapeutic confirmatory  (Phase III)",
            "population_recrutement": "Women of child bearing potential not using contraception, Women of child bearing potential using contraception",
            "portee_recherche": "Diagnosis",
            "publication_eclaire": "autorisé",
            "reglementation_code": "REG536",
            "resume": null,
            "sexe": "Male,Female",
            "sites_investigateurs": [
              {
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
            "tranches_age": "65+ years, 18-64 years",
          },
        ]
      `)
    })
  })

  describe('transform', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it('should transform array of raw data into a collection of research study documents', () => {
      // given
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2022-10-07'))
      const riphCtisDtos = [RiphDtoTestFactory.ctis()]
      const { ingestPipelineCtis } = setup()

      // when
      const result = ingestPipelineCtis.transform(riphCtisDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })
  })

  it('should transform array of raw data into a collection of research study documents  with only authorized documents', () => {
    // given
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2022-10-07'))
    const riphCtisDtos = [
      RiphDtoTestFactory.ctis({ titre: 'TITRE 1' }),
      RiphDtoTestFactory.ctis({ publication_eclaire: 'non autorisé', titre: 'TITRE 2' }),
      RiphDtoTestFactory.ctis({ titre: 'TITRE 3' }),
    ]
    const { ingestPipelineCtis } = setup()

    // when
    const result = ingestPipelineCtis.transform(riphCtisDtos)

    // then
    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('TITRE 1')
    expect(result[1].title).toBe('TITRE 3')
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const riphCtisDtos = [RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis()]
      const { databaseService, ingestPipelineCtis } = setup()
      const documents = ingestPipelineCtis.transform(riphCtisDtos)
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineCtis.load(documents)

      // then
      expect(databaseService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})

function setup() {
  const {
    databaseService,
    logger,
    readerService,
  } = setupDependencies()

  const ingestPipelineCtis = new IngestPipelineCtis(logger, databaseService, readerService, '1970-01-01')

  return { databaseService, ingestPipelineCtis, readerService }
}
