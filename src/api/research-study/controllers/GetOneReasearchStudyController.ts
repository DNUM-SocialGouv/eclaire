import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Param, Res } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { OperationOutcomeModel } from '../application/entities/OperationOutcomeModel'
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
  @Get(':id')
  async execute(@Param('id') id: string, @Res() response: Response): Promise<void> {
    try {
      response.json(await this.researchStudyRepository.findOne(id))
    } catch (error) {
      if (error instanceof errors.ResponseError && error.meta.statusCode === 404) {
        response.status(404).json(OperationOutcomeModel.create(error.message))
      } else {
        throw error
      }
    }
  }
}
