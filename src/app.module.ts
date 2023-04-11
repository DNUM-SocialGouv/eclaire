import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { ClinicalTrialModule } from './clinical-trial/clinical-trial.module'
import { SentryModule } from './sentry/sentry.module'
import { SwaggerModule } from './swagger/swagger.module'
import { UsersModule } from './users/users.module'

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      ignoreEnvFile: process.env.NODE_ENV !== undefined,
      isGlobal: true,
    }),
    SentryModule,
    UsersModule,
    SwaggerModule,
    ClinicalTrialModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
