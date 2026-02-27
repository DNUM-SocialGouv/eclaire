import { Controller, Get, NotFoundException, Query, Res } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'

@ApiExcludeController()
@Controller('/export-page')
export class ExportPageController {
  @Get()
  servePage( @Query('token') token: string,@Res() res: Response) {
    // --- Check token ---
    if (process.env.CRON_TOKEN && token !== process.env.CRON_TOKEN) {
      throw new NotFoundException()
    }

    const baseDir = path.join(process.cwd(), 'public')
    const filePath = path.join(baseDir, 'export-page.html')
    if (!fs.existsSync(filePath)) return res.status(404).send('Page not found')
    return res.sendFile(filePath)
  }
}
