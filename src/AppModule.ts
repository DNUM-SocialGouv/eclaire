import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'

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
import { ModelUtils } from './shared/models/eclaire/ModelUtils'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      ignoreEnvFile: process.env['NODE_ENV'] !== undefined,
      isGlobal: true,
    }),
    ModelUtils.isNotDefinedOrFalse(process.env['API_RATE_LIMIT_ENABLED']) ? null : getThrottlerModule(),
    ElasticsearchModule,
    EtlModule,
    GroupModule,
    LoggerModule,
    OrganizationModule,
    LocationModule,
    ResearchStudyModule,
    SentryModule,
    SwaggerModule,
  ].filter(Boolean), // Remove `null` if API_RATE_LIMIT_ENABLED is disabled
  providers: [ModelUtils.isNotDefinedOrFalse(process.env['API_RATE_LIMIT']) ? null : getThrottlerGuard()].filter(Boolean), // Remove `null` if API_RATE_LIMIT_ENABLED is disabled
})
export class AppModule {}

function getThrottlerModule() {
  return ThrottlerModule.forRoot({
    throttlers: [
      {
        limit: parseInt(process.env['API_RATE_LIMIT_MAX_CALLS']),
        ttl: parseInt(process.env['API_RATE_LIMIT_DURATION_IN_MS']),
      },
    ],
  })
}

function getThrottlerGuard() {
  return {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }
}
