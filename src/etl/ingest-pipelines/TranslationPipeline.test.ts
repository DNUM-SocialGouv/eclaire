import { ResearchStudy } from 'fhir/r4'
import { expect } from 'vitest'

import { TranslationPipeline } from './TranslationPipeline'
import { SearchResearchStudyController } from '../../api/research-study/controllers/SearchResearchStudyController'
import { EsResearchStudyRepository } from '../../api/research-study/gateways/EsResearchStudyRepository'
import { elasticsearchIndexMapping } from '../../shared/elasticsearch/elasticsearchIndexMapping'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../shared/test/helpers/RiphDtoTestFactory'
import { EclaireDto } from '../dto/EclaireDto'
import { ResearchStudyModelFactory } from '../factory/ResearchStudyModelFactory'

describe('etl | Pipelines | TranslationPipeline', () => {
  describe('#extract', () => {
    it('should call the source to get data', async () => {
      // given
      const { esResearchStudyRepository } = await setup()
      const controller: SearchResearchStudyController = new SearchResearchStudyController(esResearchStudyRepository)

      vi.spyOn(controller, 'generateBundle')
      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, controller)

      // when
      await translationPipeline.extract()

      // then
      expect(controller.generateBundle).toHaveBeenCalledWith({
        _count: '1000',
        _lastUpdated: 'gt2000-01-01',
        _text: 'REG536',
      })
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

      const {
        databaseService,
        esResearchStudyRepository,
      } = await setup()
      await databaseService.bulkDocuments(documents)

      const controller: SearchResearchStudyController = new SearchResearchStudyController(esResearchStudyRepository)
      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, controller)

      // when
      const result: ResearchStudy[] = await translationPipeline.extract()

      // then
      expect(result[0].id).toBe('fakeId1')
      expect(result[1].id).toBe('fakeId2')
      expect(result).toHaveLength(2)
    })
  })

  describe('#transform', () => {
    it('should translate the title', () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const researchStudy2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId2' }))
      const documents: ResearchStudyModel[] = [
        ResearchStudyModelFactory.create(researchStudy1),
        ResearchStudyModelFactory.create(researchStudy2),
      ]
      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, null)

      // when
      const result: ResearchStudy[] = translationPipeline.transform(documents)

      // then
      expect(result[0].title).toBe('blah-blah-blah-traduction')
      expect(result[1].title).toBe('blah-blah-blah-traduction')
    })

    it('should translate the therapeutic area', () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(researchStudy1)]
      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, null)

      // when
      const translationResult: ResearchStudy[] = translationPipeline.transform(documents)

      // then
      const result = translationResult[0].extension.find((value) => {
        return value.url.includes('eclaire-therapeutic-area')
      })
      expect(result.valueString).toBe('traduction du domaine thérapeutique')
    })

    it('should translate the disease condition', () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(researchStudy1)]
      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, null)

      // when
      const translationResult: ResearchStudy[] = translationPipeline.transform(documents)

      // then
      const result = translationResult[0].condition.find((value) => {
        return value.text === 'diseaseCondition'
      })
      expect(result.coding[0].display).toBe('traduction de la pathologie maladie rare')
    })
  })

  describe('#load', () => {
    it('should load data into the repository', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(researchStudy1)]
      const {
        databaseService,
        esResearchStudyRepository,
      } = await setup()
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()
      const translationPipeline: TranslationPipeline = new TranslationPipeline(esResearchStudyRepository, null)

      // when
      await translationPipeline.load(documents)

      // then
      expect(databaseService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })

  describe('#execute', () => {
    it('should get data, do a translation and load the translated data into the repository', async () => {
      // given
      const eclaireDtoCtis1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'ctis1', titre: 'english ctis title' }))
      const eclaireDtoCtis2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'ctis2', titre: 'another english ctis title' }))

      const jardeTitreRecherche = 'titre jarde en français'
      const eclaireDtoJarde: EclaireDto = EclaireDto.fromJarde(RiphDtoTestFactory.jarde({ numero_national: 'jarde', titre_recherche: jardeTitreRecherche }))

      const dmTitreRecherche = 'titre dm en français'
      const eclaireDtoDm: EclaireDto = EclaireDto.fromDm(RiphDtoTestFactory.dm({ numero_national: 'dm', titre_recherche: dmTitreRecherche }))
      const documents: ResearchStudyModel[] = [
        ResearchStudyModelFactory.create(eclaireDtoCtis1),
        ResearchStudyModelFactory.create(eclaireDtoCtis2),
        ResearchStudyModelFactory.create(eclaireDtoJarde),
        ResearchStudyModelFactory.create(eclaireDtoDm),
      ]

      const { esResearchStudyRepository, databaseService } = await setup()
      await databaseService.bulkDocuments(documents)

      const controller: SearchResearchStudyController = new SearchResearchStudyController(esResearchStudyRepository)
      const translationPipeline: TranslationPipeline = new TranslationPipeline(esResearchStudyRepository, controller)

      // when
      await translationPipeline.execute()

      // then
      const ctis1: ResearchStudy = await esResearchStudyRepository.findOne('ctis1')
      expect(ctis1.title).toBe('blah-blah-blah-traduction')

      const ctis2: ResearchStudy = await esResearchStudyRepository.findOne('ctis2')
      expect(ctis2.title).toBe('blah-blah-blah-traduction')

      const jarde: ResearchStudy = await esResearchStudyRepository.findOne('jarde')
      expect(jarde.title).toBe(jardeTitreRecherche)

      const dm: ResearchStudy = await esResearchStudyRepository.findOne('dm')
      expect(dm.title).toBe(dmTitreRecherche)
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
  const numberOfResourcesByPage = Number(process.env['NUMBER_OF_RESOURCES_BY_PAGE'])

  const esResearchStudyRepository: EsResearchStudyRepository = new EsResearchStudyRepository(databaseService, configService)

  return { databaseService, esResearchStudyRepository, numberOfResourcesByPage }
}
