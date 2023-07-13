import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Param, Res } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express'

import { Public } from '../../auth/public.decorator'
import { OperationOutcome } from '../application/entities/OperationOutcome'
import { EsResearchStudyRepository } from '../gateways/EsResearchStudyRepository'

@ApiTags('Research study')
@Controller('R4/ResearchStudy')
export class GetOneReasearchStudyController {
  constructor(private readonly researchStudyRepository: EsResearchStudyRepository) {}

  @ApiOperation({ summary: 'Récupère un essai clinique depuis son identifiant unique.' })
  @ApiOkResponse({ description: 'Un essai clinique a été trouvé' })
  @ApiNotFoundResponse({ description: 'Aucun essai clinique n’a été trouvé' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Public()
  @Get(':id')
  async execute(@Param('id') id: string, @Res() response: Response): Promise<void> {
    try {
      response.json(await this.researchStudyRepository.findOne(id))
    } catch (error) {
      if (error instanceof errors.ResponseError && error.meta.statusCode === 404) {
        response.status(404).json(new OperationOutcome(error.message))
      } else {
        throw error
      }
    }
  }
}