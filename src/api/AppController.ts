import { Controller, Get, Redirect } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

@ApiExcludeController()
@Controller()
export class AppController {
  @Redirect('api')
  @Get()
  getHome(): void {
    return
  }
}
