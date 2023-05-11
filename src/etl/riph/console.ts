import { NestFactory } from '@nestjs/core'

import { RiphService } from './riph.service'
import { AppModule } from '../../app.module'

async function bootstrap(): Promise<void> {
  const application = await NestFactory.createApplicationContext(AppModule)
  const command = process.argv[2]
  const riphService = application.get(RiphService)

  switch (command) {
    case 'import-riph':
      await riphService.imports()
      break
    case 'healthcheck':
      console.log({ healthcheck: 'success' })
      break
    default:
      console.log('Commande introuvable')
      process.exit(1)
  }

  await application.close()
  process.exit(0)
}

void bootstrap()
