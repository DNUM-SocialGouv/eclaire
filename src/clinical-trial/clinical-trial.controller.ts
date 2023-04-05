import { Controller, Get, Param, Res } from '@nestjs/common'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express'

import { ClinicalTrialService } from './clinical-trial.service'
import { ClinicalTrialResponse } from './response/clinical-trial.response'

@Controller('clinical-trial')
export class ClinicalTrialController {
  constructor(private readonly clinicalTrialService: ClinicalTrialService) {}

  @Get(':uuid')
  getOne(@Param('uuid') uuid: string, @Res() res: Response): void {
    const clinicaltrial = this.clinicalTrialService.findOne(uuid)
    if (clinicaltrial) {
      res.json((new ClinicalTrialResponse(clinicaltrial)).getResponse())
    }
  }
}
