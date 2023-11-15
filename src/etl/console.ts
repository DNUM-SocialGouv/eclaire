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
    case 'import':
      await etlService.import()
      break
    case 'reset-index':
      await etlService.deleteIndex()
      await etlService.createIndex()
      break
    case 'meddra-import':
      await etlService.medDraImport()
      break
    case 'create-policies':
      await etlService.createPolicies()
      break
    case 'delete-policies':
      await etlService.deletePolicies()
      break
    case 'delete-pipelines':
      await etlService.deletePipelines()
      break
    case 'translate':
      await etlService.translate()
      break
    default:
      process.exit(1)
  }

  await application.close()
  process.exit(0)
}

void console()
