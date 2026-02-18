import { IngestPipelineDmDmdiv } from './IngestPipelineDmDmdiv'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../../shared/test/helpers/RiphDtoTestFactory'
import { RiphDmDto } from '../../dto/RiphDmDto'

describe('etl | IngestPipelineDm', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm()]
      const { ingestPipelineDm, readerService } = setup()
      vi.spyOn(readerService, 'read').mockResolvedValueOnce(riphDmDtos)

      // when
      const result = await ingestPipelineDm.extract<RiphDmDto>()

      // then
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "caracteristiques_recherche": null,
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
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
            "date_creation_etude": null,
            "date_debut_recrutement": null,
            "date_fin_recrutement": null,
            "date_previsionnelle_fin_etude": null,
            "date_soumission": "2023-01-12",
            "dates_avis_favorable_ms_mns": "21.01155.000011-MS01:2021-11-09, 21.01155.000011-MS02:2022-03-09, 21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2022-11-29",
            "deposant_adresse": "15 Boulevard du Général Leclerc",
            "deposant_code_postal": "59100",
            "deposant_courriel": "cdp_scs@soladis.fr",
            "deposant_nom": "D'HONDT",
            "deposant_organisme": "Soladis Clinical Studies",
            "deposant_pays": "France",
            "deposant_prenom": "Olivier",
            "deposant_promoteur": "Promoteur institutionnel",
            "deposant_siret": null,
            "deposant_ville": "Roubaix",
            "domaine_therapeutique": "Hépato-gastro-entérologie",
            "duree_participation": null,
            "etat": "TERMINEE_ANTICIPEE",
            "historique": "2023-04-06:Terminée",
            "investigateur": "test",
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
            "numero": "22.01284.000262",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_national": "2021-A01563-38",
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
            "qualification": "IC-Cas 4.2",
            "recherche_ancillaire_ou_extension": false,
            "reglementation_code": "REG745",
            "resume": null,
            "sites_investigateurs": [
              {
                "adresse": null,
                "code_postal": null,
                "courriel": null,
                "nom": null,
                "organisme": null,
                "prenom": null,
                "service": null,
                "telephone": null,
                "titre_investigateur": null,
                "ville": null,
              },
            ],
            "statut_recrutement": "Recrutement en attente",
            "taille_etude": 96,
            "titre_recherche": "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
          },
          {
            "caracteristiques_recherche": null,
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
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
            "date_creation_etude": null,
            "date_debut_recrutement": null,
            "date_fin_recrutement": null,
            "date_previsionnelle_fin_etude": null,
            "date_soumission": "2023-01-12",
            "dates_avis_favorable_ms_mns": "21.01155.000011-MS01:2021-11-09, 21.01155.000011-MS02:2022-03-09, 21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2022-11-29",
            "deposant_adresse": "15 Boulevard du Général Leclerc",
            "deposant_code_postal": "59100",
            "deposant_courriel": "cdp_scs@soladis.fr",
            "deposant_nom": "D'HONDT",
            "deposant_organisme": "Soladis Clinical Studies",
            "deposant_pays": "France",
            "deposant_prenom": "Olivier",
            "deposant_promoteur": "Promoteur institutionnel",
            "deposant_siret": null,
            "deposant_ville": "Roubaix",
            "domaine_therapeutique": "Hépato-gastro-entérologie",
            "duree_participation": null,
            "etat": "TERMINEE_ANTICIPEE",
            "historique": "2023-04-06:Terminée",
            "investigateur": "test",
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
            "numero": "22.01284.000262",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_national": "2021-A01563-38",
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
            "qualification": "IC-Cas 4.2",
            "recherche_ancillaire_ou_extension": false,
            "reglementation_code": "REG745",
            "resume": null,
            "sites_investigateurs": [
              {
                "adresse": null,
                "code_postal": null,
                "courriel": null,
                "nom": null,
                "organisme": null,
                "prenom": null,
                "service": null,
                "telephone": null,
                "titre_investigateur": null,
                "ville": null,
              },
            ],
            "statut_recrutement": "Recrutement en attente",
            "taille_etude": 96,
            "titre_recherche": "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
          },
          {
            "caracteristiques_recherche": null,
            "contact_public_courriel": null,
            "contact_public_nom": null,
            "contact_public_prenom": null,
            "contact_public_telephone": null,
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
            "date_creation_etude": null,
            "date_debut_recrutement": null,
            "date_fin_recrutement": null,
            "date_previsionnelle_fin_etude": null,
            "date_soumission": "2023-01-12",
            "dates_avis_favorable_ms_mns": "21.01155.000011-MS01:2021-11-09, 21.01155.000011-MS02:2022-03-09, 21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2022-11-29",
            "deposant_adresse": "15 Boulevard du Général Leclerc",
            "deposant_code_postal": "59100",
            "deposant_courriel": "cdp_scs@soladis.fr",
            "deposant_nom": "D'HONDT",
            "deposant_organisme": "Soladis Clinical Studies",
            "deposant_pays": "France",
            "deposant_prenom": "Olivier",
            "deposant_promoteur": "Promoteur institutionnel",
            "deposant_siret": null,
            "deposant_ville": "Roubaix",
            "domaine_therapeutique": "Hépato-gastro-entérologie",
            "duree_participation": null,
            "etat": "TERMINEE_ANTICIPEE",
            "historique": "2023-04-06:Terminée",
            "investigateur": "test",
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
            "numero": "22.01284.000262",
            "numero_isrctn": null,
            "numero_libre": null,
            "numero_national": "2021-A01563-38",
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
            "qualification": "IC-Cas 4.2",
            "recherche_ancillaire_ou_extension": false,
            "reglementation_code": "REG745",
            "resume": null,
            "sites_investigateurs": [
              {
                "adresse": null,
                "code_postal": null,
                "courriel": null,
                "nom": null,
                "organisme": null,
                "prenom": null,
                "service": null,
                "telephone": null,
                "titre_investigateur": null,
                "ville": null,
              },
            ],
            "statut_recrutement": "Recrutement en attente",
            "taille_etude": 96,
            "titre_recherche": "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
          },
        ]
      `)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2022-10-07'))
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm()]
      const { ingestPipelineDm } = setup()

      // when
      const result = ingestPipelineDm.transform(riphDmDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })

    it('should transform array of raw data into a collection of research study documents with only authorized documents', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2022-10-07'))
      // given
      const riphDmDtos = [
        RiphDtoTestFactory.dm({ titre_recherche: 'TITRE 1' }),
        RiphDtoTestFactory.dm({
          publication_eclaire: 'non autorisé',
          titre_recherche: 'TITRE 2',
        }),
        RiphDtoTestFactory.dm({ titre_recherche: 'TITRE 3' }),
      ]
      const { ingestPipelineDm } = setup()

      // when
      const result = ingestPipelineDm.transform(riphDmDtos)

      // then
      expect(result).toHaveLength(2)
      expect(result[0].title).toBe('TITRE 1')
      expect(result[1].title).toBe('TITRE 3')
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2022-10-07'))
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm()]
      const { databaseService, ingestPipelineDm } = setup()
      const documents = ingestPipelineDm.transform(riphDmDtos)
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineDm.load(documents)

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

  const ingestPipelineDm = new IngestPipelineDmDmdiv(logger, databaseService, readerService)

  return { databaseService, ingestPipelineDm, readerService }
}
