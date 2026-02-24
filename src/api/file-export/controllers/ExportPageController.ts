import { ApiExcludeController } from '@nestjs/swagger'
import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import * as path from 'path'
import * as fs from 'fs'


@ApiExcludeController()
@Controller('/export-page')
export class ExportPageController {
  @Get()
  async servePage(@Res() res: Response) {
    const baseDir = path.join(process.cwd(), 'public')
    const filePath = path.join(baseDir, "export-page.html")
    if (!fs.existsSync(filePath)) return res.status(404).send('Page not found')
    return res.sendFile(filePath)
  }
}