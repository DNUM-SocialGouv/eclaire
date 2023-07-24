import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './api/AppController'
import { ClinicalTrialModule } from './api/clinical-trial/ClinicalTrialModule'
import { ResearchStudyModule } from './api/research-study/ResearchStudyModule'
import { SentryModule } from './api/sentry/sentry.module'
import { SwaggerModule } from './api/swagger/swagger.module'
import { FhirEtlModule } from './etl/FhirEtlModule'
import { ElasticsearchModule } from './shared/elasticsearch/ElasticsearchModule'
import { LoggerModule } from './shared/logger/LoggerModule'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      ignoreEnvFile: process.env.NODE_ENV !== undefined,
      isGlobal: true,
    }),
    SentryModule,
    SwaggerModule,
    ClinicalTrialModule,
    ResearchStudyModule,
    ElasticsearchModule,
    FhirEtlModule,
    LoggerModule,
  ],
})
export class AppModule {}
