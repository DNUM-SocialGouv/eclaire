import { Controller, Get, Request, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller()
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Request() request: ParameterDecorator) {
    // @ts-ignore
    // eslint-disable-next-line
    return { email: request.user.email }
  }
}
