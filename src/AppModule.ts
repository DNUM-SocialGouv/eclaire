import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { AppController } from './api/AppController'
import { AuthModule } from './api/auth/auth.module'
import { JwtAuthGuard } from './api/auth/jwt-auth.guard'
import { ClinicalTrialModule } from './api/clinical-trial/ClinicalTrialModule'
import { SentryModule } from './api/sentry/sentry.module'
import { SwaggerModule } from './api/swagger/swagger.module'
import { UsersModule } from './api/users/users.module'
//import { EtlModule } from './etl/EtlModule'
import { FhirEtlModule } from './etl/FhirEtlModule'
import { ElasticsearchModule } from './shared/elasticsearch/ElasticsearchModule'
import { LoggerModule } from './shared/logger/LoggerModule'

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
    //EtlModule,
    FhirEtlModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
