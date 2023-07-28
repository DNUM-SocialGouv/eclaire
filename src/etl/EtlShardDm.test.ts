import { assertType, expect } from 'vitest'

import { RiphDmDto } from './dto/RiphDmDto'
import { ResearchStudyElasticsearchDocument } from './EtlShard'
import { EtlShardDm } from './EtlShardDm'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { deleteElasticsearchIndice, riphDmDto } from '../shared/test/helpers/elasticsearchHelper'

describe('etl | EtlShardDm', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const {
        elasticsearchService,
        logger,
      } = await setup()
      const etlShardDm = new EtlShardDm(logger, elasticsearchService, riphDmDto)

      // when
      const result = etlShardDm.extract()

      // then
      assertType<RiphDmDto[]>(result)
      expect(result).toStrictEqual(riphDmDto)
    })
  })

  describe('transform', () => {
    it('should transform array of raw data into a collection of research study documents', async () => {
      // given
      const {
        elasticsearchService,
        logger,
      } = await setup()
      const etlShardDm = new EtlShardDm(logger, elasticsearchService, riphDmDto)

      // when
      const result = etlShardDm.transform(riphDmDto)

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
      } = await setup()
      const etlShardDm = new EtlShardDm(logger, elasticsearchService, riphDmDto)
      const documents = etlShardDm.transform(riphDmDto)

      // when
      await etlShardDm.load(documents)

      // then
      expect(elasticsearchService.bulkDocuments).toHaveBeenCalledWith(documents)
    })
  })
})

async function setup() {
  const { client } = await deleteElasticsearchIndice()
  const elasticsearchService = new ElasticsearchService(client)
  const logger = new LoggerService()

  vi.spyOn(elasticsearchService, 'bulkDocuments').mock
  vi.spyOn(logger, 'info').mockImplementation(() => {
    return
  })

  return { elasticsearchService, logger }
}
