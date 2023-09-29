import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './api/AppController'
import { ResearchStudyModule } from './api/research-study/ResearchStudyModule'
import { SentryModule } from './api/sentry/sentry.module'
import { SwaggerModule } from './api/swagger/swagger.module'
import { EtlModule } from './etl/EtlModule'
import { ElasticsearchModule } from './shared/elasticsearch/ElasticsearchModule'
import { LoggerModule } from './shared/logger/LoggerModule'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      ignoreEnvFile: process.env['NODE_ENV'] !== undefined,
      isGlobal: true,
    }),
    ElasticsearchModule,
    EtlModule,
    LoggerModule,
    ResearchStudyModule,
    SentryModule,
    SwaggerModule,
  ],
})
export class AppModule {}
