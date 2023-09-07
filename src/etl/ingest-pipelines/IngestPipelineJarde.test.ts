import { expect } from 'vitest'

import { IngestPipelineJarde } from './IngestPipelineJarde'
import { ResearchStudyModel } from '../../shared/models/domain-resources/ResearchStudyModel'
import { setupClientAndElasticsearchService } from '../../shared/test/helpers/elasticsearchHelper'
import { RiphJardeDto } from '../dto/RiphJardeDto'
import { RiphDtoTestFactory } from 'src/shared/test/helpers/RiphDtoTestFactory'

describe('etl | IngestPipelineJarde', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const riphJardeDtos = [RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde(), RiphDtoTestFactory.jarde()]
      const { ingestPipelineJarde, readerService } = await setup()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphJardeDtos)

      // when
      const result = ingestPipelineJarde.extract<RiphJardeDto>()

      // then
      expect(result).toStrictEqual(riphJardeDtos)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', async () => {
      // given
      const riphJardeDtos = [RiphDtoTestFactory.jarde()]
      const { ingestPipelineJarde } = await setup()

      // when
      const result = ingestPipelineJarde.transform(riphJardeDtos)

      // then
      expect(result[0]).toBeInstanceOf(ResearchStudyModel)
    })

    it('should not find "RAPATRIEE_CTIS" because it is a duplicate', async () => {
      // GIVEN
      const riphJardeDtoWithApprovedAndFromCtisStatuses = [
        RiphDtoTestFactory.jarde({ etat: 'A_DEMARRER' }),
        RiphDtoTestFactory.jarde({ etat: 'RAPATRIEE_CTIS' }),
      ]
      const { ingestPipelineJarde } = await setup()

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
      const { elasticsearchService, ingestPipelineJarde } = await setup()
      const documents = ingestPipelineJarde.transform(riphJardeDtos)
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()

      // when
      await ingestPipelineJarde.load(documents)

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

  const ingestPipelineJarde = new IngestPipelineJarde(logger, elasticsearchService, readerService)

  return { elasticsearchService, ingestPipelineJarde, readerService }
}
