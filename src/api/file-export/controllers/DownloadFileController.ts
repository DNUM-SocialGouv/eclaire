import { Controller, Get, Res, Post, Param } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Response } from 'express'

import { EtlService } from '../../../etl/EtlService'
import { ExportJobService } from '../application/ExportJobService'

@ApiExcludeController()
@Controller('/api/export')
export class ExportController {
  constructor(
    private readonly etlService: EtlService,
    private readonly jobService: ExportJobService
  ) { }

  private async processJob(jobId: string) {
    try {
      const filePath = await this.etlService.generateFileWithProgress(
        (progress) => {
          void this.jobService.updateProgress(jobId, progress)
        }
      )
      await this.jobService.complete(jobId, filePath)
    } catch (err: any) {
      await this.jobService.fail(jobId, err.message)
    }
  }

  // 1. Create a new job
  @Post('start')
  async startExport() {
    const job = await this.jobService.createJob()
    void this.processJob(job.id)
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
  async download(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const job = await this.jobService.getJob(id)
    if (!job) {
      res.status(404).json({ error: 'Job not found' })
      return
    }
    if (job.status !== 'done' || !job.filePath) {
      res.status(400).json({ error: 'File not ready' })
      return
    }

    try {
      res.download(job.filePath, 'export.xlsx')
    } catch (err: any) {
      await this.jobService.fail(id, err.message)
      if (!res.headersSent) res.status(500).json({ error: err.message })
    }
  }
}
