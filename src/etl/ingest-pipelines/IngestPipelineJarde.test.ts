import { expect } from 'vitest'

import { IngestPipelineJarde } from './IngestPipelineJarde'
import {
  riphJardeDtoWithActiveStatus,
  riphJardeDtoWithApprovedAndFromCtisStatuses,
  setupClientAndElasticsearchService,
} from '../../shared/test/helpers/elasticsearchHelper'
import { RiphJardeDto } from '../dto/RiphJardeDto'

describe('etl | IngestPipelineJarde', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const { ingestPipelineJarde } = await setup(riphJardeDtoWithActiveStatus)

      // when
      const result = ingestPipelineJarde.extract<RiphJardeDto>()

      // then
      expect(result).toStrictEqual(riphJardeDtoWithActiveStatus)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', async () => {
      // given
      const { ingestPipelineJarde } = await setup(riphJardeDtoWithActiveStatus)

      // when
      const result = ingestPipelineJarde.transform(riphJardeDtoWithActiveStatus)

      // then
      expect(result).toHaveLength(6)
    })

    it('should not find "RAPATRIEE_CTIS" because it is a duplicate', async () => {
      // GIVEN
      const { ingestPipelineJarde } = await setup(riphJardeDtoWithApprovedAndFromCtisStatuses)

      // WHEN
      const result = ingestPipelineJarde.transform(riphJardeDtoWithApprovedAndFromCtisStatuses)

      // THEN
      expect(result).toHaveLength(2)
      expect(result).not.toContainEqual({ create: { _id: '2021-A01022-59' } })
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const { elasticsearchService, ingestPipelineJarde } = await setup(riphJardeDtoWithActiveStatus)
      const documents = ingestPipelineJarde.transform(riphJardeDtoWithActiveStatus)

      // when
      await ingestPipelineJarde.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})

async function setup(riphJardeDto: RiphJardeDto[]) {
  const {
    elasticsearchService,
    logger,
    readerService,
  } = await setupClientAndElasticsearchService()
  vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
  vi.spyOn(readerService, 'read').mockReturnValueOnce(riphJardeDto)

  const ingestPipelineJarde = new IngestPipelineJarde(logger, elasticsearchService, readerService)

  return { elasticsearchService, ingestPipelineJarde }
}
