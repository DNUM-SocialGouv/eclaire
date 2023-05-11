import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express'

import { Public } from '../../auth/public.decorator'
import { ClinicalTrial } from '../application/entities/ClinicalTrial'
import { NotFoundClinicalTrialException } from '../application/Exceptions/NotFoundClinicalTrialException'
import { EsClinicalTrialRepository } from '../gateways/es-repository/es-clinical-trial.repository'

@ApiTags('Clinical Trial')
@Controller('clinical-trial')
export class GetOneClinicalTrialController {
  constructor(private readonly clinicalTrialRepository: EsClinicalTrialRepository) {}

  @ApiOperation({ summary: 'Récupère un essai clinique depuis son identifiant unique.' })
  @ApiOkResponse({ description: 'Un essai clinique a été trouvé', type: ClinicalTrial })
  @ApiNotFoundResponse({ description: 'Aucun essai clinique n’a été trouvé' })
  @Public()
  @Get(':uuid')
  async execute(@Param('uuid') uuid: string, @Res() res: Response): Promise<void> {
    try {
      res.json(await this.clinicalTrialRepository.findOne(uuid))
    } catch (error) {
      if (error instanceof NotFoundClinicalTrialException) {
        throw new NotFoundException(error.message)
      }
    }
  }
}
