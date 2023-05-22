import { Module } from '@nestjs/common'

import { LoggerService } from './LoggerService'

@Module({
  exports: [LoggerService],
  providers: [LoggerService],
})
export class LoggerModule {}
