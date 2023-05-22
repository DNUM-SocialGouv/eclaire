import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { SentryController } from './sentry.controller'
import { SentryInterceptor } from './sentry.interceptor'
import { SentryService } from './sentry.service'

@Module({
  controllers: [SentryController],
  providers: [
    SentryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
  ],
})
export class SentryModule {}
