import { Controller, Get } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

@ApiExcludeController()
@Controller()
export class SentryController {
  @Get('sentry')
  getSentry() {
    throw Error('Lancer une erreur dans Sentry')
  }
}
