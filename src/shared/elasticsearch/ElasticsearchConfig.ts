import { ClientOptions } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'

export class ElasticsearchConfig {
  constructor(private readonly configService: ConfigService) {}

  getClientOptions(): ClientOptions {
    return {
      compression: 'gzip',
      node: this.configService.get<string>('SCALINGO_ELASTICSEARCH_URL'),
      suggestCompression: true,
    }
  }
}
