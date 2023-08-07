import { expect } from 'vitest'

import { EtlShardJarde } from './EtlShardJarde'
import {
  riphJardeDtoWithActiveStatus,
  riphJardeDtoWithApprovedAndFromCtisStatuses,
  setupClientAndElasticsearchService,
} from '../shared/test/helpers/elasticsearchHelper'

describe('etl | EtlShardJarde', () => {
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

      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, readerService)

      // when
      const result = etlShardJarde.extract()

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

      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, readerService)

      // when
      const result = etlShardJarde.transform(riphJardeDtoWithActiveStatus)

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

      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, readerService)

      // WHEN
      const result = etlShardJarde.transform(riphJardeDtoWithApprovedAndFromCtisStatuses)

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

      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, readerService)
      const documents = etlShardJarde.transform(riphJardeDtoWithActiveStatus)

      // when
      await etlShardJarde.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})
