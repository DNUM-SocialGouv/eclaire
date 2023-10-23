import { Client } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'

import { ElasticsearchConfig } from '../../elasticsearch/ElasticsearchConfig'
import { ElasticsearchService } from '../../elasticsearch/ElasticsearchService'
import { LoggerService } from '../../logger/LoggerService'
import { S3Service } from 'src/etl/s3/S3Service'

export function setupClientAndElasticsearchService() {
  vi.stubEnv('SCALINGO_ELASTICSEARCH_URL', 'http://localhost:9201')

  const configService = new ConfigService()
  const elasticsearchConfig = new ElasticsearchConfig(configService)
  const client = new Client(elasticsearchConfig.getClientOptions())
  const logger = new LoggerService()
  vi.spyOn(logger, 'info').mockReturnValue()
  const elasticsearchService = new ElasticsearchService(client)
  const readerService = new S3Service(configService)

  return {
    client,
    configService,
    elasticsearchService,
    logger,
    readerService,
  }
}
