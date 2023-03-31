import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { SentryModule } from './sentry/sentry.module'
import { UsersModule } from './users/users.module'
import { configuration } from '../config/configuration'

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      ignoreEnvFile: process.env.NODE_ENV !== undefined,
      isGlobal: true,
      load: [configuration],
    }),
    SentryModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
