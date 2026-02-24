import { Controller, Post } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'

import { ExportJobService } from '../application/ExportJobService'

@ApiExcludeController()
@Controller('/api/export-jobs-index')
export class ExportJobsIndexController {
  constructor(private readonly jobService: ExportJobService) {}

  @Post()
  async createIndex() {
    await this.jobService.createIndex()
    return { message: 'Export jobs index created' }
  }
}
