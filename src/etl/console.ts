import { NestFactory } from '@nestjs/core'

import { FhirEtlService } from './FhirEtlService'
import { AppModule } from '../AppModule'

async function console(): Promise<void> {
  const application = await NestFactory.createApplicationContext(AppModule)
  const command = process.argv[2]
  const fhirEtlService = application.get(FhirEtlService)

  switch (command) {
    case 'create-index':
      await fhirEtlService.createIndex()
      break
    case 'import':
      await fhirEtlService.import()
      break
    case 'reset-index':
      await fhirEtlService.deleteIndex()
      await fhirEtlService.createIndex()
      break
    default:
      process.exit(1)
  }

  await application.close()
  process.exit(0)
}

void console()
