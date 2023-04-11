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

import { DbClinicalTrialRepository } from './clinical-trial.repository'
import { ClinicalTrialModel } from './model/ClinicalTrialModel'

@ApiTags('Clinical Trial')
@ApiBearerAuth()
@Controller('clinical-trial')
export class ClinicalTrialController {
  constructor(private readonly clinicalTrialService: DbClinicalTrialRepository) {}

  @ApiOperation({ summary: 'Récupère un essai clinique depuis son identifiant unique.' })
  @Get(':uuid')
  @ApiOkResponse({ description: 'Un essai clinique a été trouvé', type: [ClinicalTrialModel] })
  @ApiNotFoundResponse({ description: 'Aucun essai clinique n\'a été trouvé' })
  getOne(@Param('uuid') uuid: string, @Res() res: Response): void {
    const clinicalTrial = this.clinicalTrialService.findOne(uuid)

    if (clinicalTrial) {
      res.json(clinicalTrial)
    }
  }
}
