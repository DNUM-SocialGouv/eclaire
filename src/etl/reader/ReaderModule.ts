import { Module } from '@nestjs/common'

import { ReaderService } from './ReaderService'

@Module({
  exports: [ReaderService],
  providers: [ReaderService],
})
export class ReaderModule {}
