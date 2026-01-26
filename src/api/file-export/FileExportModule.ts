import { Module } from '@nestjs/common'

import { DownloadFileController } from './controllers/DownloadFileController'
import { LocalFileExportRepository } from './gateway/LocalFileExportRepository'
import { EtlModule } from '../../etl/EtlModule'
import { NextcloudModule } from '../../etl/nextcloud/NextcloudModule';

@Module({
  controllers: [DownloadFileController],
  imports: [EtlModule, NextcloudModule],
  providers: [
    {
      provide: 'FileExportRepository',
      useClass: LocalFileExportRepository,
    },
  ],
})
export class FileExportModule { }
