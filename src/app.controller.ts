import {
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'

import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth-guard'
import { Public } from './auth/public.decorator'
import { SentryInterceptor } from './monitoring/sentry/sentry.interceptor'
import { User } from './users/user'

@UseInterceptors(SentryInterceptor)
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Redirect('api')
  @Get()
  getHome(): void {
    return
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() request: ParameterDecorator) {
    // @ts-ignore
    // eslint-disable-next-line
    return this.authService.login(new User(request.user))
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request: ParameterDecorator) {
    // @ts-ignore
    // eslint-disable-next-line
    return { email: request.user.email }
  }
}
