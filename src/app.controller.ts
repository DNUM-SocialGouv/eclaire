import { Controller, Get, Redirect, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { SentryInterceptor } from "./monitoring/sentry/sentry.interceptor";

@UseInterceptors(SentryInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('api')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getHome(): void {}
}
