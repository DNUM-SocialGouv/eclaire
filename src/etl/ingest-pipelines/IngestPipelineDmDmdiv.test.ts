import { expect } from 'vitest'

import { IngestPipelineDmDmdiv } from './IngestPipelineDmDmdiv'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { setupClientAndElasticsearchService } from '../../shared/test/helpers/elasticsearchHelper'
import { RiphDmDto } from '../dto/RiphDmDto'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('etl | IngestPipelineDm', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm()]
      const { ingestPipelineDm, readerService } = await setup()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphDmDtos)

      // when
      const result = ingestPipelineDm.extract<RiphDmDto>()

      // then
      expect(result).toStrictEqual(riphDmDtos)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', async () => {
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm()]
      const { ingestPipelineDm } = await setup()

      // when
      const result = ingestPipelineDm.transform(riphDmDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const riphDmDtos = [RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm(), RiphDtoTestFactory.dm()]
      const { elasticsearchService, ingestPipelineDm } = await setup()
      const documents = ingestPipelineDm.transform(riphDmDtos)
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineDm.load(documents)

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

  const ingestPipelineDm = new IngestPipelineDmDmdiv(logger, elasticsearchService, readerService)

  return { elasticsearchService, ingestPipelineDm, readerService }
}
