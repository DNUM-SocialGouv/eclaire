import {
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SentryInterceptor } from './monitoring/sentry/sentry.interceptor';
import { Public } from './auth/public.decorator';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@UseInterceptors(SentryInterceptor)
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  @Redirect('api')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getHome(): void {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<object> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { email: req.user.email };
  }
}
