import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { S3Service } from './S3Service'

@Module({
  exports: [S3Service],
  imports: [ConfigModule],
  providers: [S3Service],
})
export class S3Module {}
