import { Module } from '@nestjs/common'

import { ExportJobService } from './application/ExportJobService'
import { ExportController } from './controllers/DownloadFileController'
import { ExportPageController } from './controllers/ExportPageController'
import { LocalFileExportRepository } from './gateway/LocalFileExportRepository'
import { EtlModule } from '../../etl/EtlModule'

@Module({
  controllers: [ExportController, ExportPageController],
  imports: [EtlModule],
  providers: [
    {
      provide: 'FileExportRepository',
      useClass: LocalFileExportRepository,
    },
    ExportJobService,
  ],
})
export class FileExportModule { }
