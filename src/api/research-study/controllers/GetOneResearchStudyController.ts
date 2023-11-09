import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Inject, Param, Res } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { ResearchStudy } from 'fhir/r4'

import { OperationOutcomeModel } from '../../../shared/models/domain-resources/OperationOutcomeModel'
import { ResearchStudyRepository } from '../application/ResearchStudyRepository'

@ApiTags('Research study')
@Controller('R4/ResearchStudy')
export class GetOneResearchStudyController {
  constructor(@Inject('ResearchStudyRepository') private readonly researchStudyRepository: ResearchStudyRepository) {}

  @ApiOperation({ summary: 'Récupère un essai clinique depuis son identifiant unique.' })
  @ApiOkResponse({ description: 'Un essai clinique a été trouvé' })
  @ApiNotFoundResponse({ description: 'Aucun essai clinique n’a été trouvé' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get(':id')
  async execute(@Param('id') id: string, @Res() response: Response): Promise<void> {
    try {
      const document: ResearchStudy = await this.researchStudyRepository.findOne(id)
      response.json(document)
    } catch (error) {
      if (error instanceof errors.ResponseError && error.meta.statusCode === 404) {
        const operationOutcome = OperationOutcomeModel.create(error.message)
        response.status(404).json(operationOutcome)
      } else {
        throw error
      }
    }
  }
}
