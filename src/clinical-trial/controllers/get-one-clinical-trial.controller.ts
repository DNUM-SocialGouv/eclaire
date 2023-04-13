import { Controller, Get, Param, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express'

import { ClinicalTrial } from '../application/entities/ClinicalTrial'
import { DbClinicalTrialRepository } from '../gateways/file-repository/clinical-trial.repository'

@ApiTags('Clinical Trial')
@ApiBearerAuth()
@Controller('clinical-trial')
export class GetOneClinicalTrialController {
  constructor(private readonly clinicalTrialService: DbClinicalTrialRepository) {
  }

  @ApiOperation({ summary: 'Récupère un essai clinique depuis son identifiant unique.' })
  @Get(':uuid')
  @ApiOkResponse({ description: 'Un essai clinique a été trouvé', type: [ClinicalTrial] })
  @ApiNotFoundResponse({ description: 'Aucun essai clinique n’a été trouvé' })
  getOneByUuid(@Param('uuid') uuid: string, @Res() res: Response): void {
    const clinicalTrial = this.clinicalTrialService.findOne(uuid)

    if (clinicalTrial) {
      res.json(clinicalTrial)
    }
  }
}