import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
import { SwaggerService } from './swagger/swagger.service'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.disable('x-powered-by')
  app.get(SwaggerService).create(app)

  await app.listen(process.env.PORT || 3000)
}
void bootstrap()
