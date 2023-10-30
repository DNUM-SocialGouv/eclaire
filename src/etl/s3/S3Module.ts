import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { S3Service } from './S3Service'

@Module({
  exports: [S3Service],
  providers: [
    {
      inject: [ConfigService],
      provide: S3Service,
      useFactory: (configService: ConfigService): S3Service => {
        return new S3Service(configService)
      },
    },
  ],
})
export class S3Module {}
