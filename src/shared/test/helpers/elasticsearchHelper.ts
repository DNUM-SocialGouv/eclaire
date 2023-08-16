import { Client } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'

import { FileReaderService } from '../../../etl/file-reader/FileReaderService'
import { ElasticsearchConfig } from '../../elasticsearch/ElasticsearchConfig'
import { ElasticsearchService } from '../../elasticsearch/ElasticsearchService'
import { LoggerService } from '../../logger/LoggerService'

export async function setupClientAndElasticsearchService() {
  process.env.SCALINGO_ELASTICSEARCH_URL = 'http://localhost:9201'
  process.env.ECLAIRE_URL = 'http://localhost:3000/'
  process.env.NUMBER_OF_RESOURCES_BY_PAGE = '2'

  const configService = new ConfigService()
  const elasticsearchConfig = new ElasticsearchConfig(configService)
  const client = new Client(elasticsearchConfig.getClientOptions())
  const logger = new LoggerService()
  vi.spyOn(logger, 'info').mockReturnValue()
  const elasticsearchService = new ElasticsearchService(client)
  await elasticsearchService.deleteAnIndex()
  const readerService = new FileReaderService()

  return {
    client,
    configService,
    elasticsearchService,
    logger,
    readerService,
  }
}
