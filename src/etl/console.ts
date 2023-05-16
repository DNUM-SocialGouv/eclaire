import { NestFactory } from '@nestjs/core'

import { EtlService } from './EtlService'
import { AppModule } from '../AppModule'

async function console(): Promise<void> {
  const application = await NestFactory.createApplicationContext(AppModule)
  const command = process.argv[2]
  const etlService = application.get(EtlService)

  switch (command) {
    case 'create-index':
      await etlService.createIndex()
      break
    case 'import-riph':
      await etlService.import()
      break
    default:
      process.exit(1)
  }

  await application.close()
  process.exit(0)
}

void console()
