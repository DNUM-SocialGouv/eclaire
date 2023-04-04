import { Controller, Get, Redirect } from '@nestjs/common'

@Controller()
export class AppController {
  @Redirect('api')
  @Get()
  getHome(): void {
    return
  }
}
