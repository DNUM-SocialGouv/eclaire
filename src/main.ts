import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { SwaggerService } from './api/swagger/swagger.service'
import { AppModule } from './AppModule'

import './api/sentry/instrument'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({ methods: ['GET'], origin: 'https://www.data.gouv.fr' })

  app.disable('x-powered-by')

  app.get(SwaggerService).create(app)

  await app.listen(process.env['PORT'] || 3000)
}
void bootstrap()
