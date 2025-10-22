import { NestFactory } from '@nestjs/core'

import { EtlService } from './EtlService'
import { AppModule } from '../AppModule'

async function console(): Promise<void> {
  const application = await NestFactory.createApplicationContext(AppModule)
  const command = process.argv[2]
  const startingDate = process.argv[3]
  const etlService = application.get(EtlService)

  switch (command) {
    case 'create-index':
      await etlService.createIndex()
      break
    case 'import':
      await etlService.import(startingDate)
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
      await etlService.translate(startingDate)
      break
    case 'update-meddra-labels':
      await etlService.updateMeddraLabels(startingDate)
      break
    case 'daily-update':
      await etlService.dailyUpdate(startingDate)
      break
    case 'hard-index-migration':
      await etlService.deleteIndex()
      await etlService.createIndex()
      await etlService.dailyUpdate('1970-01-01')
      break
    case 'hard-import-migration':
      await etlService.deleteIndex()
      await etlService.createIndex()
      await etlService.importData('1970-01-01')
      break 
    default:
      process.exit(1)
  }

  await application.close()
  process.exit(0)
}

void console()
