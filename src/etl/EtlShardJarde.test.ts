import { assertType, expect } from 'vitest'

import { RiphJardeDto } from './dto/RiphJardeDto'
import { ResearchStudyElasticsearchDocument } from './EtlShard'
import { EtlShardJarde } from './EtlShardJarde'
import { riphJardeDto1, setupClientAndElasticsearchService } from '../shared/test/helpers/elasticsearchHelper'

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

      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, riphJardeDto1)

      // when
      const result = etlShardJarde.extract()

      // then
      assertType<RiphJardeDto[]>(result)
      expect(result).toStrictEqual(riphJardeDto1)
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
      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, riphJardeDto1)

      // when
      const result = etlShardJarde.transform(riphJardeDto1)

      // then
      assertType<ResearchStudyElasticsearchDocument[]>(result)
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
      const etlShardJarde = new EtlShardJarde(logger, elasticsearchService, riphJardeDto1)
      const documents = etlShardJarde.transform(riphJardeDto1)

      // when
      await etlShardJarde.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})
