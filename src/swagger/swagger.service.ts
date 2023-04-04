import { Injectable } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

@Injectable()
export class SwaggerService {
  create(app: NestExpressApplication) {
    const config = new DocumentBuilder()
      .setTitle('API Eclaire')
      .setDescription('Base nationale des essais cliniques')
      .setVersion('0.1')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }
}
