import { Module } from '@nestjs/common'

import { DownloadDocumentationController } from './controllers/DocumentationController'
import { LocalDocumentationRepository } from './gateway/LocalDocumentationRepository'

@Module({
  controllers: [DownloadDocumentationController],
  providers: [
    {
      provide: 'DocumentationRepository',
      useClass: LocalDocumentationRepository,
    },
  ],
})
export class DocumentationModule { }
