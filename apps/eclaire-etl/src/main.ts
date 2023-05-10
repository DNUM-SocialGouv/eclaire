import { CommandFactory } from 'nest-commander'

import { EclaireEtlModule } from './eclaire-etl.module'

async function bootstrap() {
  await CommandFactory.run(EclaireEtlModule, ['warn', 'error'])
}

void bootstrap()
