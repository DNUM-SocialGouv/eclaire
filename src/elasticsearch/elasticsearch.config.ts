import { ClientOptions } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { hostname } from 'os'

@Injectable()
export class ElasticsearchConfig {
  private readonly defaultConfig = (elasticsearchUrl: string): ClientOptions => {
    return {
      compression: 'gzip',
      maxRetries: 5,
      node: elasticsearchUrl,
      opaqueIdPrefix: `${hostname()}-`,
      requestTimeout: 20000,
    }
  }

  constructor(private configService: ConfigService) {}

  getClientOptions(): ClientOptions {
    const eSClientConfigLocal = (elasticsearchUrl: string): ClientOptions => {
      return { ...this.defaultConfig(elasticsearchUrl) }
    }

    const eSClientConfigProduction = (elasticsearchUrl: string): ClientOptions => {
      return { ...this.defaultConfig(elasticsearchUrl) }
    }

    const elasticsearchUrl = this.configService.get<string>('SCALINGO_ELASTICSEARCH_URL')

    return this.configService.get('NODE_ENV') === 'production'
      ? eSClientConfigProduction(elasticsearchUrl)
      : eSClientConfigLocal(elasticsearchUrl)
  }
}
