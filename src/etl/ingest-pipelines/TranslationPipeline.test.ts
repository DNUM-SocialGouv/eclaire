import { ResearchStudy } from 'fhir/r4'
import { expect } from 'vitest'

import { TranslationPipeline } from './TranslationPipeline'
import { EsResearchStudyRepository } from '../../api/research-study/gateways/EsResearchStudyRepository'
import { elasticsearchIndexMapping } from '../../shared/elasticsearch/elasticsearchIndexMapping'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { setupClientAndElasticsearchService } from '../../shared/test/helpers/elasticsearchHelper'
import { RiphDtoTestFactory } from '../../shared/test/helpers/RiphDtoTestFactory'
import { EclaireDto } from '../dto/EclaireDto'
import { ResearchStudyModelFactory } from '../factory/ResearchStudyModelFactory'

describe('etl | Pipelines | TranslationPipeline', () => {
  describe('#extractAndTransform', () => {
    it('should get data from the repository and translate the title', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents = [ResearchStudyModelFactory.create(researchStudy1)]
      const {
        elasticsearchService,
        esResearchStudyRepository,
      } = await setup(documents)
      vi.spyOn(elasticsearchService, 'findOneDocument').mockResolvedValueOnce((id: string) => {
        return documents.find((document) => document.id === id)
      })
      const translationPipeline: TranslationPipeline = new TranslationPipeline(esResearchStudyRepository)

      // when
      const result: ResearchStudy = await translationPipeline.extractAndTransform('fakeId1')

      // then
      expect(elasticsearchService.findOneDocument).toHaveBeenCalledWith('fakeId1')
      expect(result.title).toBe('blah-blah-blah-traduction')
    })
  })

  describe('#load', () => {
    it('should load data into the repository', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents = [ResearchStudyModelFactory.create(researchStudy1)]
      const {
        elasticsearchService,
        esResearchStudyRepository,
      } = await setup(documents)
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      const translationPipeline: TranslationPipeline = new TranslationPipeline(esResearchStudyRepository)

      // when
      await translationPipeline.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })

  describe('#execute', () => {
    it('should get data, do a translation and load the translated data into the repository', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(researchStudy1)]
      const { esResearchStudyRepository } = await setup(documents)
      const translationPipeline: TranslationPipeline = new TranslationPipeline(esResearchStudyRepository)

      // when
      await translationPipeline.execute('fakeId1')

      // then
      const researchStudy: ResearchStudy = await esResearchStudyRepository.findOne('fakeId1')
      expect(researchStudy.title).toBe('blah-blah-blah-traduction')
    })
  })
})

async function setup(documents: ResearchStudyModel[]) {
  const { configService, elasticsearchService } = await setupClientAndElasticsearchService()
  const numberOfResourcesByPage = Number(process.env['NUMBER_OF_RESOURCES_BY_PAGE'])

  await elasticsearchService.createAnIndex(elasticsearchIndexMapping)
  await elasticsearchService.bulkDocuments(documents)

  const esResearchStudyRepository = new EsResearchStudyRepository(elasticsearchService, configService)

  return { elasticsearchService, esResearchStudyRepository, numberOfResourcesByPage }
}
