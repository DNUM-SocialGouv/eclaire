/* eslint-disable sort-keys */
import { errors } from '@elastic/elasticsearch'

import { EtlService } from './EtlService'
import { LoggerService } from '../shared/logger/LoggerService'
import { riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2, setupClientAndElasticsearchService } from '../shared/test/helpers/elasticsearchHelper'

describe('extract transform load service', () => {
  describe('when index is created', function () {
    it('should not create an index when create has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      // @ts-ignore
      jest.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.ResponseError({ body: { error: { reason: 'ES create operation has failed' } } }))

      try {
        // WHEN
        await etlService.createIndex()
        throw new Error('Should not be triggered')
      } catch (error) {
        // THEN
        // @ts-ignore
        expect(error.message).toBe('ES create operation has failed')
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('should not create an index when create has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      // @ts-ignore
      jest.spyOn(client.indices, 'create').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES create operation has failed'))

      try {
        // WHEN
        await etlService.createIndex()
        throw new Error('Should not be triggered')
      } catch (error) {
        // THEN
        // @ts-ignore
        expect(error.message).toBe('ES create operation has failed')
        expect(error).toBeInstanceOf(Error)
      }
    })
  })

  describe('when import is performed', function () {
    it('should find data for each clinical trials type (CTIS, DM, JARDE1, JARDE2)', async () => {
      // GIVEN
      const { elasticsearchService, etlService } = await setup()
      await etlService.createIndex()

      // WHEN
      await etlService.import()

      // THEN
      const ctisClinicalTrial = await elasticsearchService.findOneDocument(riphCtisDto[0].numero_ctis)
      const dmClinicalTrial = await elasticsearchService.findOneDocument(riphDmDto[0].numero_national)
      const jarde1ClinicalTrial = await elasticsearchService.findOneDocument(riphJardeDto1[0].numero_national)
      const jarde2ClinicalTrial = await elasticsearchService.findOneDocument(riphJardeDto2[0].numero_national)

      expect(ctisClinicalTrial).toStrictEqual({
        universal_trial_number: 'INDISPONIBLE',
        secondaries_trial_numbers: { ctis: '2022-500014-26-00' },
        public_title: {
          acronym: 'INDISPONIBLE',
          value: 'INDISPONIBLE',
        },
        scientific_title: {
          acronym: 'INDISPONIBLE',
          value: 'A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER',
        },
        recruitment: {
          status: 'en cours',
          date_recruiting_status: '2022-06-30',
          genders: [
            'homme',
            'femme',
          ],
          ages_range: [
            '65 ans et +',
            '18-64 ans',
          ],
          ages_range_secondary_identifiers: ['INDISPONIBLE'],
          target_number: 21,
          exclusion_criteria: {
            id: 'INDISPONIBLE',
            value: 'INDISPONIBLE',
            value_language: 'INDISPONIBLE',
          },
          inclusion_criteria: {
            id: 'INDISPONIBLE',
            value: 'INDISPONIBLE',
            value_language: 'INDISPONIBLE',
          },
          clinical_trial_group: 'Données non disponible',
          vulnerable_population: [
            'Women of child bearing potential not using contraception',
            'Women of child bearing potential using contraception',
          ],
        },
        study_type: {
          phase: 'Therapeutic confirmatory  (Phase III)',
          type: 'INDISPONIBLE',
          design: 'INDISPONIBLE',
        },
        last_revision_date: 'INDISPONIBLE',
        contact: {
          public_query: {
            name: 'F. Hoffmann-La Roche AG',
            firstname: 'Head of EU',
            lastname: 'Trial Information Support Line-TISL, Switzerland',
            address: 'Grenzacherstrasse 124',
            city: 'Basel Town',
            country: 'Switzerland',
            zip: '4058',
            telephone: '0041616881111',
            email: 'global.rochegenentechtrials@roche.com',
            organization: 'INDISPONIBLE',
            organization_id: 'INDISPONIBLE',
            type: 'INDISPONIBLE',
            department: 'INDISPONIBLE',
          },
          scientific_query: {
            name: 'INDISPONIBLE',
            firstname: 'INDISPONIBLE',
            lastname: 'INDISPONIBLE',
            address: 'INDISPONIBLE',
            city: 'INDISPONIBLE',
            country: 'INDISPONIBLE',
            zip: 'INDISPONIBLE',
            telephone: 'INDISPONIBLE',
            email: 'INDISPONIBLE',
            organization: 'INDISPONIBLE',
            organization_id: 'INDISPONIBLE',
            type: 'INDISPONIBLE',
            department: 'INDISPONIBLE',
          },
        },
        medical_condition: 'Locally-Advanced or Metastatic breast cancer (MBC)',
        medical_condition_meddra: [
          '10070575',
          '10065430',
        ],
        therapeutic_areas: [
          {
            value: 'Diseases [C] - Neoplasms [C04]',
            code: 'INDISPONIBLE',
          },
        ],
        primary_sponsor: {
          name: 'F. Hoffmann-La Roche AG',
          firstname: 'Head of EU',
          lastname: 'Trial Information Support Line-TISL, Switzerland',
          address: 'Grenzacherstrasse 124',
          city: 'Basel Town',
          country: 'Switzerland',
          zip: '4058',
          telephone: '0041616881111',
          email: 'global.rochegenentechtrials@roche.com',
          organization: 'INDISPONIBLE',
          organization_id: 'INDISPONIBLE',
          type: 'INDISPONIBLE',
          department: 'INDISPONIBLE',
        },
        trial_sites: [
          {
            name: '',
            firstname: '',
            lastname: '',
            address: '',
            city: '',
            country: 'INDISPONIBLE',
            zip: 'INDISPONIBLE',
            telephone: 'INDISPONIBLE',
            email: 'INDISPONIBLE',
            organization: '',
            organization_id: 'INDISPONIBLE',
            type: '',
            department: '',
          },
        ],
        summary: 'INDISPONIBLE',
        clinical_trial_type: 'REG536',
        clinical_trial_category: 'INDISPONIBLE',
      })
      expect(dmClinicalTrial).toStrictEqual({
        universal_trial_number: 'INDISPONIBLE',
        secondaries_trial_numbers: { national_number: '2021-A01563-38' },
        public_title: {
          value: 'INDISPONIBLE',
          acronym: 'INDISPONIBLE',
        },
        scientific_title: {
          value: "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
          acronym: 'INDISPONIBLE',
        },
        recruitment: {
          status: 'TERMINEE_ANTICIPEE',
          date_recruiting_status: '',
          genders: ['INDISPONIBLE'],
          ages_range: ['INDISPONIBLE'],
          ages_range_secondary_identifiers: ['INDISPONIBLE'],
          target_number: 96,
          exclusion_criteria: {
            id: 'INDISPONIBLE',
            value: 'INDISPONIBLE',
            value_language: 'INDISPONIBLE',
          },
          inclusion_criteria: {
            id: 'INDISPONIBLE',
            value: 'INDISPONIBLE',
            value_language: 'INDISPONIBLE',
          },
          clinical_trial_group: 'INDISPONIBLE',
          vulnerable_population: ['INDISPONIBLE'],
        },
        study_type: {
          phase: 'INDISPONIBLE',
          type: 'INDISPONIBLE',
          design: 'INDISPONIBLE',
        },
        last_revision_date: 'INDISPONIBLE',
        contact: {
          public_query: {
            name: 'Soladis Clinical Studies',
            firstname: 'Olivier',
            lastname: "D'HONDT",
            address: '15 Boulevard du Général Leclerc',
            city: 'Roubaix',
            country: 'France',
            zip: '59100',
            telephone: 'INDISPONIBLE',
            email: 'cdp_scs@soladis.fr',
            organization: 'Soladis Clinical Studies',
            organization_id: 'INDISPONIBLE',
            type: 'Promoteur institutionnel',
            department: 'INDISPONIBLE',
          },
          scientific_query: {
            name: 'INDISPONIBLE',
            firstname: 'INDISPONIBLE',
            lastname: 'INDISPONIBLE',
            address: 'INDISPONIBLE',
            city: 'INDISPONIBLE',
            country: 'INDISPONIBLE',
            zip: 'INDISPONIBLE',
            telephone: 'INDISPONIBLE',
            email: 'INDISPONIBLE',
            organization: 'INDISPONIBLE',
            organization_id: 'INDISPONIBLE',
            type: 'INDISPONIBLE',
            department: 'INDISPONIBLE',
          },
        },
        medical_condition: 'INDISPONIBLE',
        medical_condition_meddra: ['INDISPONIBLE'],
        therapeutic_areas: [
          {
            value: 'Hépato-gastro-entérologie',
            code: 'INDISPONIBLE',
          },
        ],
        primary_sponsor: {
          name: 'Soladis Clinical Studies',
          firstname: 'Olivier',
          lastname: "D'HONDT",
          address: '15 Boulevard du Général Leclerc',
          city: 'Roubaix',
          country: 'France',
          zip: '59100',
          telephone: 'INDISPONIBLE',
          email: 'cdp_scs@soladis.fr',
          organization: 'Soladis Clinical Studies',
          organization_id: 'INDISPONIBLE',
          type: 'Promoteur institutionnel',
          department: 'INDISPONIBLE',
        },
        trial_sites: [],
        summary: 'INDISPONIBLE',
        clinical_trial_type: 'REG745',
        clinical_trial_category: 'IC-Cas 4.2',
      })
      expect(jarde1ClinicalTrial).toStrictEqual({
        universal_trial_number: 'INDISPONIBLE',
        secondaries_trial_numbers: { national_number: '2021-A01022-39' },
        public_title: {
          acronym: 'INDISPONIBLE',
          value: 'INDISPONIBLE',
        },
        scientific_title: {
          acronym: 'INDISPONIBLE',
          value: 'Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.',
        },
        recruitment: {
          status: 'EN_COURS',
          date_recruiting_status: '',
          genders: ['INDISPONIBLE'],
          ages_range: ['INDISPONIBLE'],
          ages_range_secondary_identifiers: ['INDISPONIBLE'],
          target_number: 23,
          exclusion_criteria: {
            id: 'INDISPONIBLE',
            value: 'INDISPONIBLE',
            value_language: 'INDISPONIBLE',
          },
          inclusion_criteria: {
            id: 'INDISPONIBLE',
            value: 'INDISPONIBLE',
            value_language: 'INDISPONIBLE',
          },
          clinical_trial_group: 'INDISPONIBLE',
          vulnerable_population: ['INDISPONIBLE'],
        },
        study_type: {
          phase: 'INDISPONIBLE',
          type: 'INDISPONIBLE',
          design: 'INDISPONIBLE',
        },
        last_revision_date: 'INDISPONIBLE',
        contact: {
          public_query: {
            name: 'Université Polytechnique Hauts-de-France',
            firstname: 'Christophe',
            lastname: 'GILLET',
            address: 'LAMIH - Campus du Mont-Houy',
            city: 'Valenciennes',
            country: 'France',
            zip: '59313',
            telephone: 'INDISPONIBLE',
            email: 'christophe.gillet@uphf.fr',
            organization: 'Université Polytechnique Hauts-de-France',
            organization_id: 'INDISPONIBLE',
            type: 'Promoteur institutionnel',
            department: 'INDISPONIBLE',
          },
          scientific_query: {
            name: 'INDISPONIBLE',
            firstname: 'INDISPONIBLE',
            lastname: 'INDISPONIBLE',
            address: 'INDISPONIBLE',
            city: 'INDISPONIBLE',
            country: 'INDISPONIBLE',
            zip: 'INDISPONIBLE',
            telephone: 'INDISPONIBLE',
            email: 'INDISPONIBLE',
            organization: 'INDISPONIBLE',
            organization_id: 'INDISPONIBLE',
            type: 'INDISPONIBLE',
            department: 'INDISPONIBLE',
          },
        },
        medical_condition: 'INDISPONIBLE',
        medical_condition_meddra: ['INDISPONIBLE'],
        therapeutic_areas: [
          {
            value: 'Autres',
            code: 'INDISPONIBLE',
          },
        ],
        primary_sponsor: {
          name: 'Université Polytechnique Hauts-de-France',
          firstname: 'Christophe',
          lastname: 'GILLET',
          address: 'LAMIH - Campus du Mont-Houy',
          city: 'Valenciennes',
          country: 'France',
          zip: '59313',
          telephone: 'INDISPONIBLE',
          email: 'christophe.gillet@uphf.fr',
          organization: 'Université Polytechnique Hauts-de-France',
          organization_id: 'INDISPONIBLE',
          type: 'Promoteur institutionnel',
          department: 'INDISPONIBLE',
        },
        trial_sites: [],
        summary: 'INDISPONIBLE',
        clinical_trial_type: 'JARDE',
        clinical_trial_category: 'Catégorie 3',
      })
      expect(jarde2ClinicalTrial).toStrictEqual({
        universal_trial_number: 'INDISPONIBLE',
        secondaries_trial_numbers: { national_number: '2021-A01260-41' },
        public_title: {
          acronym: 'INDISPONIBLE',
          value: 'INDISPONIBLE',
        },
        scientific_title: {
          acronym: 'INDISPONIBLE',
          value: 'Baromètre Santé Adulte 2021',
        },
        recruitment: {
          status: 'A_DEMARRER',
          date_recruiting_status: '',
          genders: ['INDISPONIBLE'],
          ages_range: ['INDISPONIBLE'],
          ages_range_secondary_identifiers: ['INDISPONIBLE'],
          target_number: 5500,
          exclusion_criteria: {
            id: 'INDISPONIBLE',
            value: 'INDISPONIBLE',
            value_language: 'INDISPONIBLE',
          },
          inclusion_criteria: {
            id: 'INDISPONIBLE',
            value: 'INDISPONIBLE',
            value_language: 'INDISPONIBLE',
          },
          clinical_trial_group: 'INDISPONIBLE',
          vulnerable_population: ['INDISPONIBLE'],
        },
        study_type: {
          phase: 'INDISPONIBLE',
          type: 'INDISPONIBLE',
          design: 'INDISPONIBLE',
        },
        last_revision_date: 'INDISPONIBLE',
        contact: {
          public_query: {
            name: 'Agence Sanitaire et Sociale Nouvelle Calédonie ',
            firstname: 'Pascale',
            lastname: 'DOMINGUE MENA',
            address: '16 Rue du Général Gallieni',
            city: 'Nouméa',
            country: 'France',
            zip: '98800',
            telephone: 'INDISPONIBLE',
            email: 'pascale.dominguemena@ass.nc',
            organization: 'Agence Sanitaire et Sociale Nouvelle Calédonie ',
            organization_id: 'INDISPONIBLE',
            type: 'Promoteur institutionnel',
            department: 'INDISPONIBLE',
          },
          scientific_query: {
            name: 'INDISPONIBLE',
            firstname: 'INDISPONIBLE',
            lastname: 'INDISPONIBLE',
            address: 'INDISPONIBLE',
            city: 'INDISPONIBLE',
            country: 'INDISPONIBLE',
            zip: 'INDISPONIBLE',
            telephone: 'INDISPONIBLE',
            email: 'INDISPONIBLE',
            organization: 'INDISPONIBLE',
            organization_id: 'INDISPONIBLE',
            type: 'INDISPONIBLE',
            department: 'INDISPONIBLE',
          },
        },
        medical_condition: 'INDISPONIBLE',
        medical_condition_meddra: ['INDISPONIBLE'],
        therapeutic_areas: [
          {
            value: 'Autres',
            code: 'INDISPONIBLE',
          },
        ],
        primary_sponsor: {
          name: 'Agence Sanitaire et Sociale Nouvelle Calédonie ',
          firstname: 'Pascale',
          lastname: 'DOMINGUE MENA',
          address: '16 Rue du Général Gallieni',
          city: 'Nouméa',
          country: 'France',
          zip: '98800',
          telephone: 'INDISPONIBLE',
          email: 'pascale.dominguemena@ass.nc',
          organization: 'Agence Sanitaire et Sociale Nouvelle Calédonie ',
          organization_id: 'INDISPONIBLE',
          type: 'Promoteur institutionnel',
          department: 'INDISPONIBLE',
        },
        trial_sites: [],
        summary: 'INDISPONIBLE',
        clinical_trial_type: 'JARDE',
        clinical_trial_category: 'Catégorie 2',
      })
    })

    it('should not create some clinical trials when bulk has failed with ResponseError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      await etlService.createIndex()
      // @ts-ignore
      jest.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ResponseError({ body: { error: { reason: 'ES bulk operation has failed' } } }))

      try {
        // WHEN
        await etlService.import()
        throw new Error('Should not be triggered')
      } catch (error) {
        // THEN
        // @ts-ignore
        expect(error.message).toBe('ES bulk operation has failed')
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('should not create some clinical trials when bulk has failed with ElasticsearchClientError', async () => {
      // GIVEN
      const { client, etlService } = await setup()
      await etlService.createIndex()
      // @ts-ignore
      jest.spyOn(client, 'bulk').mockRejectedValueOnce(new errors.ElasticsearchClientError('ES bulk operation has failed'))

      try {
        // WHEN
        await etlService.import()
        throw new Error('Should not be triggered')
      } catch (error) {
        // THEN
        // @ts-ignore
        expect(error.message).toBe('ES bulk operation has failed')
        expect(error).toBeInstanceOf(Error)
      }
    })
  })
})
async function setup() {
  const {
    client,
    elasticsearchService,
  } = await setupClientAndElasticsearchService()
  const logger = new LoggerService()
  jest.spyOn(logger, 'info').mockImplementation(jest.fn())

  const etlService = new EtlService(logger, elasticsearchService, riphCtisDto, riphDmDto, riphJardeDto1, riphJardeDto2)

  return { client, elasticsearchService, etlService }
}
