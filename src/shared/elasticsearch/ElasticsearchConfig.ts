import { ClientOptions } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
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
