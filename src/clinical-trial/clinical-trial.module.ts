import { Module } from '@nestjs/common'

import { GetOneClinicalTrialController } from './controllers/get-one-clinical-trial.controller'
import { DbClinicalTrialRepository } from './gateways/file-repository/clinical-trial.repository'
import data from './gateways/file-repository/clinical-trials.json'

@Module({
  controllers: [GetOneClinicalTrialController],
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
