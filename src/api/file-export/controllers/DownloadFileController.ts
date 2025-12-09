import { Controller, Get, Inject, Res, Header, NotFoundException } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { FileExportRepository } from '../application/FileExportRepository';

@Controller('/api/export')
export class DownloadFileController {
    constructor(
        @Inject('FileExportRepository')
        private readonly repository: FileExportRepository
    ) { }

    @ApiExcludeEndpoint()
    @Get()
    @Header('Content-Type', 'application/octet-stream')
    async download(@Res() res: Response) {
        const filePath = await this.repository.getExportFilePath();

        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('Fichier Excel introuvable sur le serveur');
        }

        // --- Générer le nom dynamique ---
        const today = new Date();
        const dateString = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
        const filename = `export_eclaire_${dateString}.xlsx`;

        return res.download(filePath, filename);
    }
}
