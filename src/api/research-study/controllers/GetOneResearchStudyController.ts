import { Controller, Get, Header, Inject, Param, Res } from '@nestjs/common'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger'
import { errors } from '@opensearch-project/opensearch'
import { Response } from 'express'
import { OperationOutcome } from 'fhir/r4'

import { OperationOutcomeModel } from '../../../shared/models/domain-resources/OperationOutcomeModel'
import { ResearchStudyModel } from '../../../shared/models/domain-resources/ResearchStudyModel'
import { ResearchStudyRepository } from '../application/ResearchStudyRepository'

@ApiTags('Research study')
@Controller('R4/ResearchStudy')
export class GetOneResearchStudyController {
  constructor(@Inject('ResearchStudyRepository') private readonly researchStudyRepository: ResearchStudyRepository) {}

  @ApiOperation({ summary: 'Récupère un essai clinique depuis son identifiant unique.' })
  @ApiOkResponse({ description: 'Un essai clinique a été trouvé' })
  @ApiNotFoundResponse({ description: 'Aucun essai clinique n’a été trouvé' })
  @ApiTooManyRequestsResponse({ description: 'Trop de requêtes simultanées. Réessayez plus tard.' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get(':id')
  async execute(@Param('id') id: string, @Res() response: Response): Promise<void> {
    try {
      const document: ResearchStudyModel = await this.researchStudyRepository.findOne(id)
      response.json({
        resourceType: document.resourceType,
        ...document,
      })
    } catch (error) {
      if (error instanceof errors.ResponseError && error.meta.statusCode === 404) {
        const operationOutcome: OperationOutcome = OperationOutcomeModel.create(error?.meta?.body)
        response.status(404).json(operationOutcome)
      } else {
        throw error
      }
    }
  }
}
