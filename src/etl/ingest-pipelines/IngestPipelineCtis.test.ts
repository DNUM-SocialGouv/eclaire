import { expect } from 'vitest'

import { IngestPipelineCtis } from './IngestPipelineCtis'
import { riphCtisDto, setupClientAndElasticsearchService } from '../../shared/test/helpers/elasticsearchHelper'

describe('etl | IngestPipelineCtis', () => {
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
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphCtisDto)

      const ingestPipelineCtis = new IngestPipelineCtis(logger, elasticsearchService, readerService)

      // when
      const result = ingestPipelineCtis.extract()

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
        readerService,
      } = await setupClientAndElasticsearchService()
      vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
      vi.spyOn(logger, 'info').mockReturnValueOnce()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphCtisDto)

      const ingestPipelineCtis = new IngestPipelineCtis(logger, elasticsearchService, readerService)

      // when
      const result = ingestPipelineCtis.transform(riphCtisDto)

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
      vi.spyOn(logger, 'info').mockReturnValueOnce()
      vi.spyOn(readerService, 'read').mockReturnValueOnce(riphCtisDto)

      const ingestPipelineCtis = new IngestPipelineCtis(logger, elasticsearchService, readerService)
      const documents = ingestPipelineCtis.transform(riphCtisDto)

      // when
      await ingestPipelineCtis.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})
