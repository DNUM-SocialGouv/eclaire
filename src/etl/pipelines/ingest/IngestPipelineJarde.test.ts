import { IngestPipelineJarde } from './IngestPipelineJarde'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../../shared/test/helpers/RiphDtoTestFactory'
import { RiphJardeDto } from '../../dto/RiphJardeDto'

describe('etl | IngestPipelineJarde', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphJardeDtos = [RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde()]
      const { ingestPipelineJarde, readerService } = setup()
      vi.spyOn(readerService, 'read').mockResolvedValueOnce(riphJardeDtos)

      // when
      const result = await ingestPipelineJarde.extract<RiphJardeDto>()

      // then
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "caracteristiques_recherche": null,
            "competences": "Essai de phase précoce, Oncologie, Thérapie cellulaire et génique",
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
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
            "date_creation_etude": "2024-10-30T15:34:45.254294",
            "date_debut_recrutement": null,
            "date_fin_recrutement": null,
            "date_previsionnelle_fin_etude": "2026-12-10",
            "date_soumission": "2023-01-12",
            "dates_avis_favorable_ms_mns": "20.00002.210204-MS02:2021-07-29, 20.00002.210204-MS03:2021-10-26, 20.00002.210204-MS04:2023-01-26",
            "deposant_adresse": "LAMIH - Campus du Mont-Houy",
            "deposant_code_postal": "59313",
            "deposant_courriel": "christophe.gillet@uphf.fr",
            "deposant_nom": "GILLET",
            "deposant_organisme": "Université Polytechnique Hauts-de-France",
            "deposant_pays": "France",
            "deposant_prenom": "Christophe",
            "deposant_siret": null,
            "deposant_ville": "Valenciennes",
            "domaine_therapeutique": "Autres",
            "duree_participation": null,
            "etat": "EN_COURS",
            "historique": "2023-04-04:En cours",
            "investigateur": "Adrien",
            "is_mandataire": false,
            "mandataire_adresse": null,
            "mandataire_code_postal": null,
            "mandataire_email": null,
            "mandataire_nom": null,
            "mandataire_organisme": null,
            "mandataire_pays": null,
            "mandataire_prenom": null,
            "mandataire_siret": null,
            "mandataire_ville": null,
            "numero": "24.00965.001983",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_national": "2021-A01022-39",
            "numero_nct": null,
            "numero_utn": null,
            "objectifs": null,
            "participants_groupe_sujets": null,
            "participants_population_vulnerable": null,
            "participants_sexe": null,
            "participants_tranches_age": null,
            "promoteur_adresse": null,
            "promoteur_code_postal": null,
            "promoteur_email": null,
            "promoteur_nom": null,
            "promoteur_organisme": null,
            "promoteur_pays": null,
            "promoteur_prenom": null,
            "promoteur_siret": null,
            "promoteur_ville": null,
            "publication_eclaire": "autorisé",
            "qualification_recherche": "Catégorie 3",
            "recherche_ancillaire_ou_extension": false,
            "reglementation_code": "JARDE",
            "resume": null,
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
            "taille_etude": 23,
            "titre_recherche": "Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.",
            "type_promoteur": "Etudiant",
          },
          {
            "caracteristiques_recherche": null,
            "competences": "Essai de phase précoce, Oncologie, Thérapie cellulaire et génique",
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
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
            "date_creation_etude": "2024-10-30T15:34:45.254294",
            "date_debut_recrutement": null,
            "date_fin_recrutement": null,
            "date_previsionnelle_fin_etude": "2026-12-10",
            "date_soumission": "2023-01-12",
            "dates_avis_favorable_ms_mns": "20.00002.210204-MS02:2021-07-29, 20.00002.210204-MS03:2021-10-26, 20.00002.210204-MS04:2023-01-26",
            "deposant_adresse": "LAMIH - Campus du Mont-Houy",
            "deposant_code_postal": "59313",
            "deposant_courriel": "christophe.gillet@uphf.fr",
            "deposant_nom": "GILLET",
            "deposant_organisme": "Université Polytechnique Hauts-de-France",
            "deposant_pays": "France",
            "deposant_prenom": "Christophe",
            "deposant_siret": null,
            "deposant_ville": "Valenciennes",
            "domaine_therapeutique": "Autres",
            "duree_participation": null,
            "etat": "EN_COURS",
            "historique": "2023-04-04:En cours",
            "investigateur": "Adrien",
            "is_mandataire": false,
            "mandataire_adresse": null,
            "mandataire_code_postal": null,
            "mandataire_email": null,
            "mandataire_nom": null,
            "mandataire_organisme": null,
            "mandataire_pays": null,
            "mandataire_prenom": null,
            "mandataire_siret": null,
            "mandataire_ville": null,
            "numero": "24.00965.001983",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_national": "2021-A01022-39",
            "numero_nct": null,
            "numero_utn": null,
            "objectifs": null,
            "participants_groupe_sujets": null,
            "participants_population_vulnerable": null,
            "participants_sexe": null,
            "participants_tranches_age": null,
            "promoteur_adresse": null,
            "promoteur_code_postal": null,
            "promoteur_email": null,
            "promoteur_nom": null,
            "promoteur_organisme": null,
            "promoteur_pays": null,
            "promoteur_prenom": null,
            "promoteur_siret": null,
            "promoteur_ville": null,
            "publication_eclaire": "autorisé",
            "qualification_recherche": "Catégorie 3",
            "recherche_ancillaire_ou_extension": false,
            "reglementation_code": "JARDE",
            "resume": null,
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
            "taille_etude": 23,
            "titre_recherche": "Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.",
            "type_promoteur": "Etudiant",
          },
          {
            "caracteristiques_recherche": null,
            "competences": "Essai de phase précoce, Oncologie, Thérapie cellulaire et génique",
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
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
            "date_creation_etude": "2024-10-30T15:34:45.254294",
            "date_debut_recrutement": null,
            "date_fin_recrutement": null,
            "date_previsionnelle_fin_etude": "2026-12-10",
            "date_soumission": "2023-01-12",
            "dates_avis_favorable_ms_mns": "20.00002.210204-MS02:2021-07-29, 20.00002.210204-MS03:2021-10-26, 20.00002.210204-MS04:2023-01-26",
            "deposant_adresse": "LAMIH - Campus du Mont-Houy",
            "deposant_code_postal": "59313",
            "deposant_courriel": "christophe.gillet@uphf.fr",
            "deposant_nom": "GILLET",
            "deposant_organisme": "Université Polytechnique Hauts-de-France",
            "deposant_pays": "France",
            "deposant_prenom": "Christophe",
            "deposant_siret": null,
            "deposant_ville": "Valenciennes",
            "domaine_therapeutique": "Autres",
            "duree_participation": null,
            "etat": "EN_COURS",
            "historique": "2023-04-04:En cours",
            "investigateur": "Adrien",
            "is_mandataire": false,
            "mandataire_adresse": null,
            "mandataire_code_postal": null,
            "mandataire_email": null,
            "mandataire_nom": null,
            "mandataire_organisme": null,
            "mandataire_pays": null,
            "mandataire_prenom": null,
            "mandataire_siret": null,
            "mandataire_ville": null,
            "numero": "24.00965.001983",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_national": "2021-A01022-39",
            "numero_nct": null,
            "numero_utn": null,
            "objectifs": null,
            "participants_groupe_sujets": null,
            "participants_population_vulnerable": null,
            "participants_sexe": null,
            "participants_tranches_age": null,
            "promoteur_adresse": null,
            "promoteur_code_postal": null,
            "promoteur_email": null,
            "promoteur_nom": null,
            "promoteur_organisme": null,
            "promoteur_pays": null,
            "promoteur_prenom": null,
            "promoteur_siret": null,
            "promoteur_ville": null,
            "publication_eclaire": "autorisé",
            "qualification_recherche": "Catégorie 3",
            "recherche_ancillaire_ou_extension": false,
            "reglementation_code": "JARDE",
            "resume": null,
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
            "taille_etude": 23,
            "titre_recherche": "Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.",
            "type_promoteur": "Etudiant",
          },
        ]
      `)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', () => {
      // given
      const riphJardeDtos = [RiphDtoTestFactory.jarde()]
      const { ingestPipelineJarde } = setup()

      // when
      const result = ingestPipelineJarde.transform(riphJardeDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })

    it('should not find "RAPATRIEE_CTIS" because it is a duplicate', () => {
      // GIVEN
      const riphJardeDtoWithApprovedAndFromCtisStatuses = [
        RiphDtoTestFactory.jarde({ etat: 'A_DEMARRER' }),
        RiphDtoTestFactory.jarde({ etat: 'RAPATRIEE_CTIS' }),
      ]
      const { ingestPipelineJarde } = setup()

      // WHEN
      const result = ingestPipelineJarde.transform(riphJardeDtoWithApprovedAndFromCtisStatuses)

      // THEN
      expect(result).toHaveLength(1)
      expect(result).not.toContainEqual({ create: { _id: '2021-A01022-59' } })
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const riphJardeDtos = [RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde()]
      const { databaseService, ingestPipelineJarde } = setup()
      const documents = ingestPipelineJarde.transform(riphJardeDtos)
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineJarde.load(documents)

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

  const ingestPipelineJarde = new IngestPipelineJarde(logger, databaseService, readerService)

  return { databaseService, ingestPipelineJarde, readerService }
}
