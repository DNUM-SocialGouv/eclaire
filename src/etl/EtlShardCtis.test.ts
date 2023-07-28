import { expect } from 'vitest'

import { EtlShardCtis } from './EtlShardCtis'
import { riphCtisDto, setupClientAndElasticsearchService } from '../shared/test/helpers/elasticsearchHelper'

describe('etl | EtlShardCtis', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const {
        elasticsearchService,
        logger,
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockResolvedValueOnce()
      const etlShardCtis = new EtlShardCtis(logger, elasticsearchService, riphCtisDto)

      // when
      const result = etlShardCtis.extract()

      // then
      expect(result).toStrictEqual(riphCtisDto)
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
      const etlShardCtis = new EtlShardCtis(logger, elasticsearchService, riphCtisDto)

      // when
      const result = etlShardCtis.transform(riphCtisDto)

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
      const etlShardCtis = new EtlShardCtis(logger, elasticsearchService, riphCtisDto)
      const documents = etlShardCtis.transform(riphCtisDto)

      // when
      await etlShardCtis.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})
