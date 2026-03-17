import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import compression from 'compression'

import { SwaggerService } from './api/swagger/swagger.service'
import { AppModule } from './AppModule'

import './api/sentry/instrument'


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({
    origin: ['https://www.data.gouv.fr'],
    methods: ['GET'],
    credentials: false,
  })

  app.disable('x-powered-by')

  // Add for securisation
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  )
  app.use(compression())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.get(SwaggerService).create(app)

  await app.listen(process.env['PORT'] || 3000)
}
void bootstrap()
