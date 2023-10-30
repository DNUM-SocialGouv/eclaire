import { Client } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'

import { S3Service } from '../../../etl/s3/S3Service'
import { ElasticsearchConfig } from '../../elasticsearch/ElasticsearchConfig'
import { ElasticsearchService } from '../../elasticsearch/ElasticsearchService'
import { LoggerService } from '../../logger/LoggerService'

export function setupDependencies() {
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
