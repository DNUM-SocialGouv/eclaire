import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import * as Sentry from '@sentry/node'

import { SentryController } from './sentry.controller'
import { SentryInterceptor } from './sentry.interceptor'

@Module({
  controllers: [SentryController],
  providers: [
    {
      inject: [ConfigService],
      provide: 'SentryService',
      useFactory: (configService: ConfigService) => {
        Sentry.init({
          dsn: configService.get<string>('SENTRY_DSN'),
          environment: configService.get<string>('NODE_ENV'),
          tracesSampleRate: 1.0,
        } satisfies Sentry.NodeOptions)
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
  ],
})
export class SentryModule {}
