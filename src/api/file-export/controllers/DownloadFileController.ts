import { Controller, Get, Post, Inject, Req, Res, Header, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { FileExportRepository } from '../application/FileExportRepository';
import { EtlService } from '../../../etl/EtlService';

@Controller('/api/export')
export class DownloadFileController {
    constructor(
        @Inject('FileExportRepository')
        private readonly repository: FileExportRepository,
        private readonly etlService: EtlService, // Service pour générer le fichier
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


    /**
   * ---------------------------------------------------
   *  ENDPOINT 2 — REFRESH (Endpoint pour Scalingo CRON)
   * ---------------------------------------------------
   */
    @ApiExcludeEndpoint()
    @Post('/refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const token = req.headers['x-cron-token'];
        
        if (process.env.CRON_TOKEN && token !== process.env.CRON_TOKEN) {
            throw new ForbiddenException('Invalid cron token');
        }

        try {
            await this.etlService.importDataOnXLS(); // Génère le fichier XLS
            return res.status(200).json({
                message: 'The XLS file was successfully generated.'
            });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            return res.status(500).json({
                message: 'Error generating XLS file.',
                error: errorMessage
            });
        }
    }

}
