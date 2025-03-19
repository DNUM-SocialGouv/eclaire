import { Module } from '@nestjs/common'

import { JsonFileReaderService } from './JsonFileReaderService'

@Module({
  exports: [JsonFileReaderService],
  providers: [JsonFileReaderService],
})
export class JsonFileReaderModule {}
