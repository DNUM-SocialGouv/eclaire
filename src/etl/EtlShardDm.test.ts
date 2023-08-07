import { expect } from 'vitest'

import { EtlShardDm } from './EtlShardDm'
import { riphDmDto, setupClientAndElasticsearchService } from '../shared/test/helpers/elasticsearchHelper'

describe('etl | EtlShardDm', () => {
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
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphDmDto)

      const etlShardDm = new EtlShardDm(logger, elasticsearchService, readerService)

      // when
      const result = etlShardDm.extract()

      // then
      expect(result).toStrictEqual(riphDmDto)
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
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphDmDto)

      const etlShardDm = new EtlShardDm(logger, elasticsearchService, readerService)

      // when
      const result = etlShardDm.transform(riphDmDto)

      // then
      expect(result).toHaveLength(6)
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
      vi.spyOn(logger, 'info').mockResolvedValueOnce()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphDmDto)

      const etlShardDm = new EtlShardDm(logger, elasticsearchService, readerService)
      const documents = etlShardDm.transform(riphDmDto)

      // when
      await etlShardDm.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})
