import { Module } from '@nestjs/common'

import { ClinicalTrialController } from './clinical-trial.controller'
import { ClinicalTrialService } from './clinical-trial.service'

@Module({
  controllers: [ClinicalTrialController],
  providers: [ClinicalTrialService],
})
export class ClinicalTrialModule {
}
