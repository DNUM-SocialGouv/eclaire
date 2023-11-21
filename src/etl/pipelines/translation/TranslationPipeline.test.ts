import { CodeableConcept, Extension, ResearchStudy } from 'fhir/r4'

import { TranslationPipeline } from './TranslationPipeline'
import { EsResearchStudyRepository } from '../../../api/research-study/gateways/EsResearchStudyRepository'
import { elasticsearchIndexMapping } from '../../../shared/elasticsearch/elasticsearchIndexMapping'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { setupDependencies } from '../../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../../shared/test/helpers/RiphDtoTestFactory'
import { setupTranslationService } from '../../../shared/test/helpers/translationHelper'
import { TranslationService } from '../../../shared/translation/TranslationService'
import { EclaireDto } from '../../dto/EclaireDto'
import { ResearchStudyModelFactory } from '../../factory/ResearchStudyModelFactory'

describe('etl | Pipelines | TranslationPipeline', () => {
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
      const translationPipeline: TranslationPipeline = new TranslationPipeline(databaseService, null)

      // when
      await translationPipeline.extract()

      // then
      expect(databaseService.search).toHaveBeenCalledWith({
        from: 0,
        query:  {
          bool:  {
            must:  [
              { range:  { 'meta.lastUpdated':  { gte: '2022-10-06' } } },
              { query_string:  { query: 'REG536' } },
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

      const translationPipeline: TranslationPipeline = new TranslationPipeline(databaseService, null)

      vi.useFakeTimers()
      vi.setSystemTime(new Date('2022-10-07'))

      // when
      const result: ResearchStudy[] = await translationPipeline.extract()

      // then
      expect(result[0].id).toBe('fakeId1')
      expect(result[1].id).toBe('fakeId2')
      expect(result).toHaveLength(2)
    })
  })

  describe('#transform', () => {
    it('should translate the title for two documents', async () => {
      // given
      const eclaireDto1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const eclaireDto2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId2' }))
      const documents: ResearchStudyModel[] = [
        ResearchStudyModelFactory.create(eclaireDto1),
        ResearchStudyModelFactory.create(eclaireDto2),
      ]

      const translationService: TranslationService = setupTranslationService()
      vi.spyOn(translationService, 'execute')
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: 'Titre 1 traduit en français' })
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: 'Titre 2 traduit en français' })

      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, translationService)

      // when
      const result: ResearchStudy[] = await translationPipeline.transform(documents)

      // then
      expect(result[0].title).toBe('Titre 1 traduit en français')
      expect(result[1].title).toBe('Titre 2 traduit en français')
    })

    it('should not translate the title for a second document when that same document does not have a title', async () => {
      // given
      const eclaireDto1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ titre: 'blah-blah-titre' }))
      const eclaireDto2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        domaine_therapeutique: 'blah',
        pathologies_maladies_rares: 'blah-blah',
        titre: null,
      }))

      const documents: ResearchStudyModel[] = [
        ResearchStudyModelFactory.create(eclaireDto1),
        ResearchStudyModelFactory.create(eclaireDto2),
      ]

      const translationService: TranslationService = setupTranslationService()
      vi.spyOn(translationService, 'execute')
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: 'Titre 1 traduit en français' })
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: '' })

      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, translationService)

      // when
      await translationPipeline.transform(documents)

      // then
      expect(translationService.execute).toHaveBeenNthCalledWith(2, {
        diseaseCondition: 'blah-blah',
        therapeuticArea: 'blah',
        title: '',
      })
    })

    it('should not translate the title when there is no title', async () => {
      // given
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ titre: null }))
      const documents: ResearchStudy[] = [ResearchStudyModelFactory.create(eclaireDto)]

      const translationService: TranslationService = setupTranslationService()
      vi.spyOn(translationService, 'execute')
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: '' })
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: '' })

      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, translationService)

      // when
      const result: ResearchStudy[] = await translationPipeline.transform(documents)

      // then
      expect(result[0].title).toBeUndefined()
    })

    it('should translate the therapeutic area', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents: ResearchStudy[] = [ResearchStudyModelFactory.create(researchStudy1)]

      const translationService: TranslationService = setupTranslationService()
      vi.spyOn(translationService, 'execute')
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: 'traduction du domaine thérapeutique', title: '' })

      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, translationService)

      // when
      const translationResult: ResearchStudy[] = await translationPipeline.transform(documents)

      // then
      const result: Extension = translationResult[0].extension.find((value) => value.url.includes('eclaire-therapeutic-area'))
      expect(result.valueString).toBe('traduction du domaine thérapeutique')
    })

    it('should not translate the therapeutic area when there is no therapeutic area', async () => {
      // given
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ domaine_therapeutique: null }))
      const documents: ResearchStudy[] = [ResearchStudyModelFactory.create(eclaireDto)]

      const translationService: TranslationService = setupTranslationService()
      vi.spyOn(translationService, 'execute')
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: '' })

      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, translationService)

      // when
      const translationResult: ResearchStudy[] = await translationPipeline.transform(documents)
      // then
      const result: Extension = translationResult[0].extension.find((value) => value.url.includes('eclaire-therapeutic-area'))
      expect(result).toBeUndefined()
    })

    it('should translate the disease condition', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents: ResearchStudy[] = [ResearchStudyModelFactory.create(researchStudy1)]

      const translationService: TranslationService = setupTranslationService()
      vi.spyOn(translationService, 'execute')
        .mockResolvedValueOnce({ diseaseCondition: 'traduction de la pathologie maladie rare', therapeuticArea: '', title: '' })

      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, translationService)

      // when
      const translationResult: ResearchStudy[] = await translationPipeline.transform(documents)

      // then
      const result: CodeableConcept = translationResult[0].condition.find((value) => value.text === 'diseaseCondition')
      expect(result.coding[0].display).toBe('traduction de la pathologie maladie rare')
    })

    it('should not translate the disease condition when there is no disease condition', async () => {
      // given
      const eclaireDto: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ pathologies_maladies_rares: null }))
      const documents: ResearchStudy[] = [ResearchStudyModelFactory.create(eclaireDto)]

      const translationService: TranslationService = setupTranslationService()
      vi.spyOn(translationService, 'execute')
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: '' })

      const translationPipeline: TranslationPipeline = new TranslationPipeline(null, translationService)

      // when
      const translationResult: ResearchStudy[] = await translationPipeline.transform(documents)
      // then
      const result: CodeableConcept = translationResult[0].condition.find((value) => value.text === 'diseaseCondition')
      expect(result).toBeUndefined()
    })
  })

  describe('#load', () => {
    it('should load data into the repository', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis())
      const documents: ResearchStudy[] = [ResearchStudyModelFactory.create(researchStudy1)]
      const { databaseService } = await setup()
      vi.spyOn(databaseService, 'bulkDocuments').mockResolvedValueOnce()
      const translationPipeline: TranslationPipeline = new TranslationPipeline(databaseService, null)

      // when
      await translationPipeline.load(documents)

      // then
      expect(databaseService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })

  describe('#execute', () => {
    it('should get data, do a translation and load the translated data into the repository', async () => {
      // given
      const today = new Date('2023-04-07')
      vi.useFakeTimers()
      vi.setSystemTime(today)
      const eclaireDtoCtis1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-04-06:Terminée',
        numero_ctis: 'ctis1',
        titre: 'english ctis title',
      }))
      const eclaireDtoCtis2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-01-02:Terminée',
        numero_ctis: 'ctis2',
        titre: 'another english ctis title',
      }))

      const jardeTitreRecherche = 'titre jarde en français'
      const eclaireDtoJarde: EclaireDto = EclaireDto.fromJarde(RiphDtoTestFactory.jarde({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-04-06:Terminée',
        numero_national: 'jarde',
        titre_recherche: jardeTitreRecherche,
      }))

      const dmTitreRecherche = 'titre dm en français'
      const eclaireDtoDm: EclaireDto = EclaireDto.fromDm(RiphDtoTestFactory.dm({
        dates_avis_favorable_ms_mns: null,
        historique: '2023-04-06:Terminée',
        numero_national: 'dm',
        titre_recherche: dmTitreRecherche,
      }))

      const documents: ResearchStudyModel[] = [
        ResearchStudyModelFactory.create(eclaireDtoCtis1),
        ResearchStudyModelFactory.create(eclaireDtoCtis2),
        ResearchStudyModelFactory.create(eclaireDtoJarde),
        ResearchStudyModelFactory.create(eclaireDtoDm),
      ]

      const { esResearchStudyRepository, databaseService } = await setup()
      await databaseService.bulkDocuments(documents)

      const translationService: TranslationService = setupTranslationService()
      vi.spyOn(translationService, 'execute')
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: 'Traduction titre 1' })
        .mockResolvedValueOnce({ diseaseCondition: '', therapeuticArea: '', title: 'Traduction titre 2' })
      const translationPipeline: TranslationPipeline = new TranslationPipeline(databaseService, translationService)

      // when
      await translationPipeline.execute()

      // then
      const ctis1: ResearchStudy = await esResearchStudyRepository.findOne('ctis1')
      expect(ctis1.title).toBe('Traduction titre 1')

      const ctis2: ResearchStudy = await esResearchStudyRepository.findOne('ctis2')
      expect(ctis2.title).toBe('another english ctis title')

      const jarde: ResearchStudy = await esResearchStudyRepository.findOne('jarde')
      expect(jarde.title).toBe(jardeTitreRecherche)

      const dm: ResearchStudy = await esResearchStudyRepository.findOne('dm')
      expect(dm.title).toBe(dmTitreRecherche)
    })

    it('should not translate when there is no data', async () => {
      // GIVEN
      const { esResearchStudyRepository, databaseService } = await setup()
      const today = new Date('2023-04-07')
      vi.useFakeTimers()
      vi.setSystemTime(today)
      const eclaireDtoCtis: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({
        dates_avis_favorable_ms_mns: null,
        historique: '2022-03-09:Terminée',
        numero_ctis: 'ctis1',
        titre: 'english ctis title',
      }))
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(eclaireDtoCtis)]
      await databaseService.bulkDocuments(documents)

      const translationPipeline: TranslationPipeline = new TranslationPipeline(databaseService, null)

      // WHEN
      await translationPipeline.execute()

      // THEN
      const ctis: ResearchStudy = await esResearchStudyRepository.findOne('ctis1')
      expect(ctis.title).toBe('english ctis title')
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
