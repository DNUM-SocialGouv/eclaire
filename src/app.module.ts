import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
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
})
export class AppModule {
}
