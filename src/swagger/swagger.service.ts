import { Injectable } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

@Injectable()
export class SwaggerService {
  create(app: NestExpressApplication) {
    const builder = new DocumentBuilder()
      .setTitle('API Eclaire')
      .setDescription('Base nationale des essais cliniques')
      .setVersion('0.1')
      .addSecurity('bearer', {
        scheme: 'bearer',
        type: 'http',
      })
      .build()
    const document = SwaggerModule.createDocument(app, builder)
    SwaggerModule.setup('api', app, document, { swaggerOptions: { tagsSorter: 'alpha' } })
  }
}
