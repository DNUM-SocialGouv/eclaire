import { Controller, Get, Redirect } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

import { Public } from './auth/public.decorator'

@ApiExcludeController()
@Controller()
export class AppController {
  @Public()
  @Redirect('api')
  @Get()
  getHome(): void {
    return
  }
}
