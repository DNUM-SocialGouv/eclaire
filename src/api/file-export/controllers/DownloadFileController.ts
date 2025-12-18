import { Controller, Get, Inject, Res, Query, ForbiddenException } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { Response } from 'express'
import * as fs from 'fs'

import { EtlService } from '../../../etl/EtlService'
import { FileExportRepository } from '../application/FileExportRepository'

@Controller('/api/export')
export class DownloadFileController {
  constructor(
        @Inject('FileExportRepository')
        private readonly repository: FileExportRepository,
        private readonly etlService: EtlService // Service pour g�n�rer le fichier
  ) { }

    @ApiExcludeEndpoint()
    @Get()
  async refresh(
        @Query('token') token: string,
        @Res() res: Response
  ) {
    // --- Verifier le token ---
    if (process.env.CRON_TOKEN && token !== process.env.CRON_TOKEN) {
      throw new ForbiddenException('Invalid cron token')
    }

    try {
      // --- Generating the XLS file ---
      await this.etlService.importDataOnXLS()

      // --- Retrieving the path to the generated file ---
      const filePath = await this.repository.getExportFilePath()
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Excel file not found after generation.' })
      }

      // --- Generate the dynamic name ---
      const today = new Date()
      const dateString = today.toISOString().split('T')[0] // "YYYY-MM-DD"
      const filename = `export_eclaire_${dateString}.xlsx`

      // --- Direct download ---
      return res.download(filePath, filename)
    } catch (err: unknown) {
      // eslint-disable-next-line
            const errorMessage = err instanceof Error ? err.message : String(err);
      return res.status(500).json({
        error: errorMessage,
        message: 'Error generating XLS file.',
      })
    }
  }

}
