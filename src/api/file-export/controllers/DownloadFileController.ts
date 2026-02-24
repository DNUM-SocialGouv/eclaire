import { Controller, Get, Inject, Res, Post, Param } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Response } from 'express'
import * as fs from 'fs'

import { EtlService } from '../../../etl/EtlService'
import { ExportJobService } from '../application/ExportJobService'
import { FileExportRepository } from '../application/FileExportRepository'

@ApiExcludeController()
@Controller('/api/export')
export class ExportController {
  constructor(
    @Inject('FileExportRepository')
    private readonly repository: FileExportRepository,
    private readonly etlService: EtlService,
    private readonly jobService: ExportJobService
  ) { }

  // 1. Create a new job
  @Post('start')
  async startExport() {
    const job = await this.jobService.createJob()

    this.etlService
      .importDataOnXLS((progress) =>
        void this.jobService.updateProgress(job.id, progress))
      .then((filePath) => this.jobService.complete(job.id, filePath))
      .catch((err) => this.jobService.fail(job.id, err.message))

    return { jobId: job.id }
  }

  // 2. Check the progress of a job
  @Get('status/:id')
  async getStatus(@Param('id') id: string) {
    const job = await this.jobService.getJob(id)
    if (!job) return { error: 'Job not found' }
    return job
  }

  // 3. Download the file if finished
  @Get('download/:id')
  async download(@Param('id') id: string, @Res() res: Response) {
    const filePath = await this.repository.getExportFilePath()

    const job = await this.jobService.getJob(id)
    if (!job) return res.status(404).json({ error: 'Job not found' })

    if (job.status !== 'done' || !job.filePath || !fs.existsSync(job.filePath) || !fs.existsSync(filePath)) {
      return res.status(400).json({ error: 'File not ready yet' })
    }

    const today = new Date()
    const dateString = today.toISOString().split('T')[0]
    const filename = `export_eclaire_${dateString}.xlsx`

    return res.download(job.filePath, filename)
  }
}
