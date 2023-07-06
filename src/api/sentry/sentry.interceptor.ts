import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common'
import * as Sentry from '@sentry/minimal'
import { tap } from 'rxjs/operators'

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap(null, (exception) => {
        if (exception instanceof NotFoundException) return

        Sentry.captureException(exception)
      })
    )
  }
}