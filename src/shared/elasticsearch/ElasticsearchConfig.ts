import { ConfigService } from '@nestjs/config'
import { ClientOptions } from '@opensearch-project/opensearch'

export class ElasticsearchConfig {
  constructor(private readonly configService: ConfigService) { }

  getClientOptions(): ClientOptions {
    return {
      compression: 'gzip',
      node: this.configService.get<string>('SCALINGO_OPENSEARCH_URL'),
      suggestCompression: true,
    }
  }
}
