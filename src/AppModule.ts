import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './api/AppController'
import { GroupModule } from './api/group/GroupModule'
import { LocationModule } from './api/location/LocationModule'
import { OrganizationModule } from './api/organization/OrganizationModule'
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
    GroupModule,
    LoggerModule,
    OrganizationModule,
    LocationModule,
    ResearchStudyModule,
    SentryModule,
    SwaggerModule,
  ],
})
export class AppModule {}
