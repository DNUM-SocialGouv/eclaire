import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Param, Res } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { OperationOutcomeModel } from '../../../shared/models/domain-resources/OperationOutcomeModel'
import { EsOrganizationRepository } from '../gateways/EsOrganizationRepository'

@ApiTags('Organization')
@Controller('R4/Organization')
export class FindOrganizationController {
  constructor(private readonly organizationRepository: EsOrganizationRepository) {}

  @ApiOperation({ summary: 'Récupère une organisation depuis son identifiant unique.' })
  @ApiOkResponse({ description: 'Une organisation a été trouvée' })
  @ApiNotFoundResponse({ description: 'Aucune organisation n’a été trouvée' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get(':id')
  async execute(@Param('id') id: string, @Res() response: Response): Promise<void> {
    try {
      const document = await this.organizationRepository.findOne(id)
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
