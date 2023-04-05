import { Controller, Get, Param, Res } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express'

import { ClinicalTrialService } from './clinical-trial.service'
import { ClinicalTrial } from './model/ClinicalTrial'
import { ClinicalTrialResponse } from './response/clinical-trial.response'

@ApiTags('Clinical Trial')
@ApiBearerAuth()
@Controller('clinical-trial')
export class ClinicalTrialController {
  constructor(private readonly clinicalTrialService: ClinicalTrialService) {}

  @ApiOperation({ summary: 'Récupère un essai clinique depuis son identifiant unique.' })
  @Get(':uuid')
  @ApiOkResponse({ description: 'Un essai clinique a été trouvé', type: [ClinicalTrial] })
  @ApiNotFoundResponse({ description: 'Aucun essai clinique n\'a été trouvé' })
  getOne(@Param('uuid') uuid: string, @Res() res: Response): void {
    const clinicaltrial = this.clinicalTrialService.findOne(uuid)
    if (clinicaltrial) {
      res.json((new ClinicalTrialResponse(clinicaltrial)).getResponse())
    }
  }
}
