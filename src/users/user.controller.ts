import { Controller, Get, Req, UseGuards } from '@nestjs/common'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express'

import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller()
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Req() request: Request) {
    const user = this.userService.getFromRequest(request)
    return { email: user.email }
  }
}
