import { ResearchStudy } from 'fhir/r4'
import { expect } from 'vitest'

import { MedDraPipeline } from './MedDraPipeline'
import { EsResearchStudyRepository } from '../../../api/research-study/gateways/EsResearchStudyRepository'
import { elasticsearchIndexMapping } from '../../../shared/elasticsearch/elasticsearchIndexMapping'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../../shared/test/helpers/RiphDtoTestFactory'
import { EclaireDto } from '../../dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

describe('etl | Pipelines | MedDraPipeline', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe('#extract', () => {
    it('should call the source to get data from yesterday', async () => {
      // given
      const { databaseService } = await setup()

      vi.useFakeTimers()
      vi.setSystemTime(new Date('2022-10-07'))

      vi.spyOn(databaseService, 'search')
      const medDraPipeline: MedDraPipeline = new MedDraPipeline(databaseService)

      // when
      await medDraPipeline.extract()

      // then
      expect(databaseService.search).toHaveBeenCalledWith({
        from: 0,
        query: {
          bool: {
            must: [
              { range: { 'meta.lastUpdated': { gte: '2022-10-06' } } },
              { query_string: { query: 'REG536' } },
            ],
          },
        },
        size: 1000,
      },
      true)
    })

    it('should call the source to get data from a date', async () => {
      // given
      const { databaseService } = await setup()
      vi.spyOn(databaseService, 'search')
      const medDraPipeline: MedDraPipeline = new MedDraPipeline(databaseService)

      // when
      await medDraPipeline.extract('2020-10-06')

      // then
      expect(databaseService.search).toHaveBeenCalledWith({
        from: 0,
        query: {
          bool: {
            must: [
              { range: { 'meta.lastUpdated': { gte: '2020-10-06' } } },
              { query_string: { query: 'REG536' } },
            ],
          },
        },
        size: 1000,
      },
      true)
    })

    it('should get CTIS data from the repository', async () => {
      // given
      const ctisDto1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-04-06:Terminée',
        numero_ctis: 'fakeId1',
      }))
      const ctisDto2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-01-09:En cours',
        numero_ctis: 'fakeId2',
      }))
      const ctisDtoOutdated: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: null,
        historique: '1999-04-04:Terminée',
      }))

      const jardeDto: EclaireDto = EclaireDto.fromJarde(RiphDtoTestFactory.jarde())

      const documents: ResearchStudyModel[] = [
        ResearchStudyModelFactory.create(ctisDto1),
        ResearchStudyModelFactory.create(ctisDto2),
        ResearchStudyModelFactory.create(ctisDtoOutdated),
        ResearchStudyModelFactory.create(jardeDto),
      ]

      const { databaseService } = await setup()
      await databaseService.bulkDocuments(documents)

      const medDraPipeline: MedDraPipeline = new MedDraPipeline(databaseService)

      vi.useFakeTimers()
      vi.setSystemTime(new Date('2022-10-07'))

      // when
      const result: ResearchStudy[] = await medDraPipeline.extract()

      // then
      expect(result[0].id).toBe('fakeId1')
      expect(result[1].id).toBe('fakeId2')
      expect(result).toHaveLength(2)
    })
  })

  describe('#transform', () => {
    it('should get a display for the meddra codes and add corresponding Fhir format to the documents', async () => {
      // given
      const { databaseService } = await setup()

      const eclaireDto: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis())
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(eclaireDto)]

      const medDraPipeline: MedDraPipeline = new MedDraPipeline(databaseService)

      // when
      const result: ResearchStudyModel[] = await medDraPipeline.transform(documents)

      // then
      expect(result[0].condition).toMatchInlineSnapshot(`
        [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "Locally-Advanced or Metastatic breast cancer (MBC)",
                "system": undefined,
                "version": undefined,
              },
            ],
            "text": "diseaseCondition",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "10070575",
                "display": "Cancer du sein à récepteurs aux oestrogènes positifs",
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "version": "2.0.1",
              },
            ],
            "text": "medDRACondition",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "10065430",
                "display": "Cancer du sein HER2 positif",
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "version": "2.0.1",
              },
            ],
            "text": "medDRACondition",
          },
        ]
      `)
    })

    it('should get a display for the meddra codes when existing and add corresponding Fhir format to the documents', async () => {
      // given
      const { databaseService } = await setup()

      const eclaireDto: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ informations_meddra: '10070575, 10065400' }))
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(eclaireDto)]

      const medDraPipeline: MedDraPipeline = new MedDraPipeline(databaseService)

      // when
      const result: ResearchStudyModel[] = await medDraPipeline.transform(documents)

      // then
      expect(result[0].condition).toMatchInlineSnapshot(`
        [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "Locally-Advanced or Metastatic breast cancer (MBC)",
                "system": undefined,
                "version": undefined,
              },
            ],
            "text": "diseaseCondition",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "10070575",
                "display": "Cancer du sein à récepteurs aux oestrogènes positifs",
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "version": "2.0.1",
              },
            ],
            "text": "medDRACondition",
          },
        ]
      `)
    })

    it('should not get a display for the meddra codes when there is none', async () => {
      // given
      const { databaseService } = await setup()

      const eclaireDto: EclaireDto = EclaireDto.fromJarde(RiphDtoTestFactory.jarde())
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(eclaireDto)]

      const medDraPipeline: MedDraPipeline = new MedDraPipeline(databaseService)

      // when
      const result: ResearchStudyModel[] = await medDraPipeline.transform(documents)

      // then
      expect(result[0].condition).toMatchInlineSnapshot(`
        [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "INDISPONIBLE",
                "system": undefined,
                "version": undefined,
              },
            ],
            "text": "diseaseCondition",
          },
        ]
      `)
    })
  })

  describe('#load', () => {
    it('should load data into the repository', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis())
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(researchStudy1)]
      const { databaseService } = await setup()
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()
      const medDraPipeline: MedDraPipeline = new MedDraPipeline(databaseService)

      // when
      await medDraPipeline.load(documents)

      // then
      expect(databaseService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })

  describe('#execute', () => {
    it('should get yesterday ctis data, do a translation and load the translated data into the repository', async () => {
      // given
      const today = new Date('2023-04-07')
      vi.useFakeTimers()
      vi.setSystemTime(today)
      const eclaireDtoCtis1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-04-06:Terminée',
        numero_ctis: 'ctis1',
      }))
      const eclaireDtoCtis2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-01-02:Terminée',
        numero_ctis: 'ctis2',
      }))

      const eclaireDtoJarde: EclaireDto = EclaireDto.fromJarde(RiphDtoTestFactory.jarde({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-04-06:Terminée',
        numero_national: 'jarde',
      }))

      const eclaireDtoDm: EclaireDto = EclaireDto.fromDm(RiphDtoTestFactory.dm({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-04-06:Terminée',
        numero_national: 'dm',
      }))

      const documents: ResearchStudyModel[] = [
        ResearchStudyModelFactory.create(eclaireDtoCtis1),
        ResearchStudyModelFactory.create(eclaireDtoCtis2),
        ResearchStudyModelFactory.create(eclaireDtoJarde),
        ResearchStudyModelFactory.create(eclaireDtoDm),
      ]

      const { databaseService, esResearchStudyRepository } = await setup()
      await databaseService.bulkDocuments(documents)

      const medDraPipeline: MedDraPipeline = new MedDraPipeline(databaseService)

      // when
      await medDraPipeline.execute()

      // then
      const ctis1: ResearchStudyModel = await esResearchStudyRepository.findOne('ctis1')
      expect(ctis1.condition).toMatchInlineSnapshot(`
        [
          {
            "coding": [
              {
                "display": "Locally-Advanced or Metastatic breast cancer (MBC)",
              },
            ],
            "text": "diseaseCondition",
          },
          {
            "coding": [
              {
                "code": "10070575",
                "display": "Cancer du sein à récepteurs aux oestrogènes positifs",
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "version": "2.0.1",
              },
            ],
            "text": "medDRACondition",
          },
          {
            "coding": [
              {
                "code": "10065430",
                "display": "Cancer du sein HER2 positif",
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "version": "2.0.1",
              },
            ],
            "text": "medDRACondition",
          },
        ]
      `)

      const ctis2: ResearchStudyModel = await esResearchStudyRepository.findOne('ctis2')
      expect(ctis2.condition).toMatchInlineSnapshot(`
        [
          {
            "coding": [
              {
                "display": "Locally-Advanced or Metastatic breast cancer (MBC)",
              },
            ],
            "text": "diseaseCondition",
          },
        ]
      `)

      const dm: ResearchStudyModel = await esResearchStudyRepository.findOne('dm')
      expect(dm.condition).toMatchInlineSnapshot(`
        [
          {
            "coding": [
              {
                "display": "INDISPONIBLE",
              },
            ],
            "text": "diseaseCondition",
          },
        ]
      `)

      const jarde: ResearchStudyModel = await esResearchStudyRepository.findOne('jarde')
      expect(jarde.condition).toMatchInlineSnapshot(`
        [
          {
            "coding": [
              {
                "display": "INDISPONIBLE",
              },
            ],
            "text": "diseaseCondition",
          },
        ]
      `)
    })
  })
})

async function setup() {
  const { configService, databaseService } = setupDependencies()

  await databaseService.deletePipelines()
  await databaseService.deletePolicies()

  await databaseService.deleteMedDraIndex()
  await databaseService.createMedDraIndex()
  await databaseService.bulkMedDraDocuments([
    {
      code: '10070575',
      label: 'Cancer du sein à récepteurs aux oestrogènes positifs',
    },
    {
      code: '10065430',
      label: 'Cancer du sein HER2 positif',
    },
  ])
  await databaseService.createPolicies()

  await databaseService.deleteAnIndex()
  await databaseService.createAnIndex(elasticsearchIndexMapping)

  vi.stubEnv('ECLAIRE_URL', 'http://localhost:3000/')
  vi.stubEnv('NUMBER_OF_RESOURCES_BY_PAGE', '2')

  const esResearchStudyRepository: EsResearchStudyRepository = new EsResearchStudyRepository(databaseService, configService)

  return { databaseService, esResearchStudyRepository }
}
