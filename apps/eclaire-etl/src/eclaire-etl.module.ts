import { Module } from '@nestjs/common'

import { ImportRiphCommand } from './commands/import-riph.command'
import { EclaireEtlService } from './eclaire-etl.service'

@Module({
  imports: [],
  providers: [EclaireEtlService, ImportRiphCommand],
})
export class EclaireEtlModule {}
