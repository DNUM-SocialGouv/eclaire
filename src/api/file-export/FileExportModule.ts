import { Module } from '@nestjs/common'

import { DownloadFileController } from './controllers/DownloadFileController'
import { LocalFileExportRepository } from './gateway/LocalFileExportRepository'
import { EtlModule } from '../../etl/EtlModule'

@Module({
  controllers: [DownloadFileController],
  imports: [EtlModule],
  providers: [
    {
      provide: 'FileExportRepository',
      useClass: LocalFileExportRepository,
    },
  ],
})
export class FileExportModule { }
