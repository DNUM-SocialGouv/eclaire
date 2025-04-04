// eslint-disable-next-line import/no-extraneous-dependencies
import * as Sentry from '@sentry/nestjs'
import * as process from 'node:process'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
})
