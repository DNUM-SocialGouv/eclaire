import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Sentry from '@sentry/node'

@Injectable()
export class SentryService {
  constructor(private readonly configService: ConfigService) {
    Sentry.init({
      dsn: this.configService.get<string>('SENTRY_DSN'),
      environment: this.configService.get<string>('NODE_ENV'),
      tracesSampleRate: 1.0,
    } satisfies Sentry.NodeOptions)
  }

  setError() {
    throw Error('Lancer une erreur de Service')
  }
}
