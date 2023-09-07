import { expect } from 'vitest'

import { IngestPipelineCtis } from './IngestPipelineCtis'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { setupClientAndElasticsearchService } from '../../shared/test/helpers/elasticsearchHelper'
import { RiphCtisDto } from '../dto/RiphCtisDto'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('etl | IngestPipelineCtis', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphCtisDtos = [RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis()]
      const { ingestPipelineCtis, readerService } = await setup()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphCtisDtos)

      // when
      const result = ingestPipelineCtis.extract<RiphCtisDto>()

      // then
      expect(result).toStrictEqual(riphCtisDtos)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', async () => {
      // given
      const riphCtisDtos = [RiphDtoTestFactory.ctis()]
      const { ingestPipelineCtis } = await setup()

      // when
      const result = ingestPipelineCtis.transform(riphCtisDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const riphCtisDtos = [RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis(), RiphDtoTestFactory.ctis()]
      const { elasticsearchService, ingestPipelineCtis } = await setup()
      const documents = ingestPipelineCtis.transform(riphCtisDtos)
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineCtis.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})

async function setup() {
  const {
    elasticsearchService,
    logger,
    readerService,
  } = await setupClientAndElasticsearchService()

  const ingestPipelineCtis = new IngestPipelineCtis(logger, elasticsearchService, readerService)

  return { elasticsearchService, ingestPipelineCtis, readerService }
}
