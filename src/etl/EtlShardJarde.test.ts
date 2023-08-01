import { expect } from 'vitest'

import { EtlShardJarde } from './EtlShardJarde'
import { riphJardeDtoWithActiveStatus, setupClientAndElasticsearchService } from '../shared/test/helpers/elasticsearchHelper'

describe('etl | EtlShardJarde', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const {
        elasticsearchService,
        logger,
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockResolvedValueOnce()

      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, riphJardeDtoWithActiveStatus)

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
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockResolvedValueOnce()
      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, riphJardeDtoWithActiveStatus)

      // when
      const result = etlShardJarde.transform(riphJardeDtoWithActiveStatus)

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
      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, riphJardeDtoWithActiveStatus)
      const documents = etlShardJarde.transform(riphJardeDtoWithActiveStatus)

      // when
      await etlShardJarde.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})
