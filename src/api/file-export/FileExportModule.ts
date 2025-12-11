import { Module } from '@nestjs/common'
import { DownloadFileController } from './controllers/DownloadFileController';
import { LocalFileExportRepository } from './gateway/LocalFileExportRepository';
import { EtlModule } from '../../etl/EtlModule';

@Module({
    imports: [EtlModule],
    controllers: [DownloadFileController],
    providers: [
        {
            provide: 'FileExportRepository',
            useClass: LocalFileExportRepository
        }
    ]
})
export class FileExportModule { }
