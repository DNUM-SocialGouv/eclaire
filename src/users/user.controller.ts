import { Controller, Get, Req } from '@nestjs/common'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express'

import { UsersService } from './users.service'

@Controller()
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('user')
  getUser(@Req() request: Request) {
    const user = this.userService.getFromRequest(request)
    return { email: user.email }
  }
}
