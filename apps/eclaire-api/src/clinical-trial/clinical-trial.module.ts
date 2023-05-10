import { Module } from '@nestjs/common'

import { GetOneClinicalTrialController } from './controllers/get-one-clinical-trial.controller'
import { ClinicalTrialFileRepository } from './gateways/file-repository/clinical-trial-file.repository'
import data from './gateways/file-repository/clinical-trials.json'

@Module({
  controllers: [GetOneClinicalTrialController],
  providers: [
    {
      provide: ClinicalTrialFileRepository,
      useFactory: () => {
        return new ClinicalTrialFileRepository(data)
      },
    },
  ],
})
export class ClinicalTrialModule {}
