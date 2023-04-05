import { Module } from '@nestjs/common'

import { ClinicalTrialController } from './clinical-trial.controller'
import { ClinicalTrialService } from './clinical-trial.service'
import data from './clinical-trials.json'

@Module({
  controllers: [ClinicalTrialController],
  providers: [
    {
      provide: ClinicalTrialService,
      useFactory: () => {
        return new ClinicalTrialService(data)
      },
    },
  ],
})
export class ClinicalTrialModule {
}
