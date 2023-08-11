import { expect } from 'vitest'

import { IngestPipelineDmDmdiv } from './IngestPipelineDmDmdiv'
import { riphDmDto, setupClientAndElasticsearchService } from '../../shared/test/helpers/elasticsearchHelper'

describe('etl | IngestPipelineDm', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const { ingestPipelineDm } = await setup()

      // when
      const result = ingestPipelineDm.extract()

      // then
      expect(result).toStrictEqual(riphDmDto)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', async () => {
      // given
      const { ingestPipelineDm } = await setup()

      // when
      const result = ingestPipelineDm.transform(riphDmDto)

      // then
      expect(result).toHaveLength(6)
    })
  })

  describe('load', () => {
    it('should load in bulk a collection of research study documents', async () => {
      // given
      const { elasticsearchService, ingestPipelineDm } = await setup()
      const documents = ingestPipelineDm.transform(riphDmDto)

      // when
      await ingestPipelineDm.load(documents)

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
  vi.spyOn(elasticsearchService, 'bulkDocuments').mockResolvedValueOnce()
  vi.spyOn(readerService, 'read').mockReturnValueOnce(riphDmDto)

  const ingestPipelineDm = new IngestPipelineDmDmdiv(logger, elasticsearchService, readerService)

  return { elasticsearchService, ingestPipelineDm }
}
