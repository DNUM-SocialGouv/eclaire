import { Controller, Get, Redirect } from '@nestjs/common'

import { Public } from './auth/public.decorator'

@Controller()
export class AppController {
  @Public()
  @Redirect('api')
  @Get()
  getHome(): void {
    return
  }
}
