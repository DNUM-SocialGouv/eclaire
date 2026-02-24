import { Module } from '@nestjs/common'

import { ExportController } from './controllers/DownloadFileController'
import { ExportPageController } from './controllers/ExportPageController'
import { LocalFileExportRepository } from './gateway/LocalFileExportRepository'
import { EtlModule } from '../../etl/EtlModule'
import { ExportJobService } from './application/ExportJobService'

@Module({
  controllers: [ExportController, ExportPageController],
  imports: [EtlModule],
  providers: [
    {
      provide: 'FileExportRepository',
      useClass: LocalFileExportRepository,
    },
    ExportJobService
  ],
})
export class FileExportModule { }
