import { NestFactory } from '@nestjs/core'

//import { EtlService } from './EtlService'
import { FhirEtlService } from './FhirEtlService'
import { AppModule } from '../AppModule'

async function console(): Promise<void> {
  const application = await NestFactory.createApplicationContext(AppModule)
  const command = process.argv[2]
  //const etlService = application.get(EtlService)
  const fhirEtlService = application.get(FhirEtlService)

  switch (command) {
    case 'import':
      await fhirEtlService.import()
      break
    case 'import-riph':
      //await etlService.import()
      break
    case 'create-index':
      await fhirEtlService.createIndex()
      break
    case 'create-index-riph':
      //await etlService.createIndex()
      break
    default:
      process.exit(1)
  }

  await application.close()
  process.exit(0)
}

void console()
