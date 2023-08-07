import { Module } from '@nestjs/common'

import { FileReaderService } from './FileReaderService'

@Module({
  exports: [FileReaderService],
  providers: [FileReaderService],
})
export class FileReaderModule {}
