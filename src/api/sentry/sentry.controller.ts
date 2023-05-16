import { Controller, Get } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

import { SentryService } from './sentry.service'
import { Public } from '../auth/public.decorator'

@ApiExcludeController()
@Controller()
export class SentryController {
  constructor(private readonly sentryService: SentryService) {}

  @Public()
  @Get('sentry')
  getSentry() {
    this.sentryService.setError()
  }
}
