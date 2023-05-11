import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { AppController } from './api/app.controller'
import { AuthModule } from './api/auth/auth.module'
import { JwtAuthGuard } from './api/auth/jwt-auth.guard'
import { ClinicalTrialModule } from './api/clinical-trial/clinical-trial.module'
import { SentryModule } from './api/sentry/sentry.module'
import { SwaggerModule } from './api/swagger/swagger.module'
import { UsersModule } from './api/users/users.module'
import { RiphModule } from './etl/riph/riph.module'
import { ElasticsearchModule } from './shared/elasticsearch/elasticsearch.module'

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
    ElasticsearchModule,
    RiphModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
