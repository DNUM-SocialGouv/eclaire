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
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockResolvedValueOnce()
      const etlShardDm = new EtlShardDm(logger, elasticsearchService, riphDmDto)

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
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockResolvedValueOnce()
      const etlShardDm = new EtlShardDm(logger, elasticsearchService, riphDmDto)

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
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockResolvedValueOnce()
      const etlShardDm = new EtlShardDm(logger, elasticsearchService, riphDmDto)
      const documents = etlShardDm.transform(riphDmDto)

      // when
      await etlShardDm.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})
