import { Module } from '@nestjs/common'

import { ClinicalTrialController } from './clinical-trial.controller'
import { DbClinicalTrialRepository } from './clinical-trial.repository'
import data from './clinical-trials.json'

@Module({
  controllers: [ClinicalTrialController],
  providers: [
    {
      provide: DbClinicalTrialRepository,
      useFactory: () => {
        return new DbClinicalTrialRepository(data)
      },
    },
  ],
})
export class ClinicalTrialModule {}
