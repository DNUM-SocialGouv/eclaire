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
  describe('#transform', () => {
    it('should get data from the repository and translate the title', () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const researchStudy2: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId2' }))
      const documents: ResearchStudyModel[] = [
        ResearchStudyModelFactory.create(researchStudy1),
        ResearchStudyModelFactory.create(researchStudy2),
      ]
      const translationPipeline: TranslationPipeline = new TranslationPipeline(null)

      // when
      const result: ResearchStudy[] = translationPipeline.transform(documents)

      // then
      expect(result[0].title).toBe('blah-blah-blah-traduction')
      expect(result[1].title).toBe('blah-blah-blah-traduction')
    })
  })

  describe('#load', () => {
    it('should load data into the repository', async () => {
      // given
      const researchStudy1: EclaireDto = EclaireDto.fromCtis(RiphDtoTestFactory.ctis({ numero_ctis: 'fakeId1' }))
      const documents: ResearchStudyModel[] = [ResearchStudyModelFactory.create(researchStudy1)]
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
      await translationPipeline.execute()

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
