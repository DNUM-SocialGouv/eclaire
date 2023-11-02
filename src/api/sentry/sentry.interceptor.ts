import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common'
import * as Sentry from '@sentry/minimal'
import { catchError, throwError } from 'rxjs'

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((exception) => {
        if (exception instanceof NotFoundException) return undefined

        return throwError(() => Sentry.captureException(exception))
      })
    )
  }
}
