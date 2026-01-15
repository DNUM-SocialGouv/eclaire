import { Controller, Get, Query, Res, NotFoundException, Inject } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { Response } from 'express'
import * as path from 'path'

import { DocumentationRepository } from '../application/DocumentationRepository'

@Controller('/documentation')
export class DownloadDocumentationController {
  constructor(
    @Inject('DocumentationRepository')
    private readonly repository: DocumentationRepository
  ) { }

  @Get()
  @ApiExcludeEndpoint()
  async getFile(
    @Query('filename') filename: string,
    @Res() res: Response
  ) {
    try {
      const filePath = await this.repository.getFilePath(filename)

      // --- Limitation des extensions ---
      const ext = path.extname(filename).toLowerCase()
      const allowedExt = ['.pdf', '.jpg', '.jpeg', '.png']
      if (!allowedExt.includes(ext)) {
        throw new NotFoundException('File type not allowed')
      }

      // --- Déterminer le type MIME pour affichage navigateur ---
      let contentType = 'application/octet-stream'
      if (ext === '.pdf') contentType = 'application/pdf'
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
      else if (ext === '.png') contentType = 'image/png'

      res.setHeader('Content-Type', contentType)

      return res.sendFile(filePath)
    } catch (err: unknown) {
      let errorMessage: string
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      } else {
        // On évite de convertir un objet inconnu avec String()
        errorMessage = 'Unknown error'
      }

      throw new NotFoundException(errorMessage)
    }
  }
}
