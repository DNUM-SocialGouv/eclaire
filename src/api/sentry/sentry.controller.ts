import { Controller, Get } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

import { SentryService } from './sentry.service'

@ApiExcludeController()
@Controller()
export class SentryController {
  constructor(private readonly sentryService: SentryService) {}

  @Get('sentry')
  getSentry() {
    this.sentryService.setError()
  }
}
