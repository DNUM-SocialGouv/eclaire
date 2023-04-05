import { Controller, Post, Request, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth-guard'
import { Public } from './public.decorator'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() request: ParameterDecorator) {
    // @ts-ignore
    // eslint-disable-next-line
    return this.authService.login(request.user as User)
  }
}
