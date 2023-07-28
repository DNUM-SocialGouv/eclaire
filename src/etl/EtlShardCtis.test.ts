import { assertType, expect } from 'vitest'

import { ResearchStudyElasticsearchDocument } from './EtlShard'
import { EtlShardCtis } from './EtlShardCtis'
import { ElasticsearchService } from '../shared/elasticsearch/ElasticsearchService'
import { LoggerService } from '../shared/logger/LoggerService'
import { deleteElasticsearchIndice, riphCtisDto } from '../shared/test/helpers/elasticsearchHelper'

describe('etl | EtlShardCtis', () => {
  describe('extract', () => {
    it('should extract raw data into an array', async () => {
      // given
      const {
        elasticsearchService,
        logger,
      } = await setup()
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
      } = await setup()
      const etlShardCtis = new EtlShardCtis(logger, elasticsearchService, riphCtisDto)

      // when
      const result = etlShardCtis.transform(riphCtisDto)

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
      const etlShardCtis = new EtlShardCtis(logger, elasticsearchService, riphCtisDto)
      const documents = etlShardCtis.transform(riphCtisDto)

      // when
      await etlShardCtis.load(documents)

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
