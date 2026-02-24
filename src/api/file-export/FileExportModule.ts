import { Module } from '@nestjs/common'

import { ExportJobService } from './application/ExportJobService'
import { ExportController } from './controllers/DownloadFileController'
import { ExportJobsIndexController } from './controllers/ExportJobsIndexController'
import { ExportPageController } from './controllers/ExportPageController'
import { LocalFileExportRepository } from './gateway/LocalFileExportRepository'
import { EtlModule } from '../../etl/EtlModule'
//import { ElasticsearchService } from '../../shared/elasticsearch/ElasticsearchService'
import { ElasticsearchModule } from '../../shared/elasticsearch/ElasticsearchModule'

@Module({
  controllers: [ExportController, ExportPageController, ExportJobsIndexController],
  imports: [EtlModule, ElasticsearchModule],
  providers: [
    {
      provide: 'FileExportRepository',
      useClass: LocalFileExportRepository,
    },
    ExportJobService,
  ],
})
export class FileExportModule { }
