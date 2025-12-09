import { Module } from '@nestjs/common'
import { DownloadFileController } from './controllers/DownloadFileController';
import { LocalFileExportRepository } from './gateway/LocalFileExportRepository';

@Module({
    controllers: [DownloadFileController],
    providers: [
        {
            provide: 'FileExportRepository',
            useClass: LocalFileExportRepository
        }
    ]
})
export class FileExportModule { }
