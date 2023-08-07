import { expect } from 'vitest'

import { IngestPipelineJarde } from './IngestPipelineJarde'
import {
  riphJardeDtoWithActiveStatus,
  riphJardeDtoWithApprovedAndFromCtisStatuses,
  setupClientAndElasticsearchService,
} from '../../shared/test/helpers/elasticsearchHelper'

describe('etl | IngestPipelineJarde', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const {
        elasticsearchService,
        logger,
        readerService,
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockReturnValueOnce()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphJardeDtoWithActiveStatus)

      const ingestPipelineJarde = new IngestPipelineJarde(logger, elasticsearchService, readerService)

      // when
      const result = ingestPipelineJarde.extract()

      // then
      expect(result).toStrictEqual(riphJardeDtoWithActiveStatus)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', async () => {
      // given
      const {
        elasticsearchService,
        logger,
        readerService,
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockReturnValueOnce()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphJardeDtoWithActiveStatus)

      const ingestPipelineJarde = new IngestPipelineJarde(logger, elasticsearchService, readerService)

      // when
      const result = ingestPipelineJarde.transform(riphJardeDtoWithActiveStatus)

      // then
      expect(result).toHaveLength(6)
    })

    it('should not find "RAPATRIEE_CTIS" because it is a duplicate', async () => {
      // GIVEN
      const {
        elasticsearchService,
        logger,
        readerService,
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockReturnValueOnce()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphJardeDtoWithApprovedAndFromCtisStatuses)

      const ingestPipelineJarde = new IngestPipelineJarde(logger, elasticsearchService, readerService)

      // WHEN
      const result = ingestPipelineJarde.transform(riphJardeDtoWithApprovedAndFromCtisStatuses)

      // THEN
      const excludeJarde = riphJardeDtoWithApprovedAndFromCtisStatuses[1].numero_national
      expect(result).not.toContain(excludeJarde)
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const {
        elasticsearchService,
        logger,
        readerService,
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockReturnValueOnce()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphJardeDtoWithActiveStatus)

      const ingestPipelineJarde = new IngestPipelineJarde(logger, elasticsearchService, readerService)
      const documents = ingestPipelineJarde.transform(riphJardeDtoWithActiveStatus)

      // when
      await ingestPipelineJarde.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})
