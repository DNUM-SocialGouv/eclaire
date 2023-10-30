import { Controller, Get, Header, Inject, Param, Res } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { Organization } from 'fhir/r4'

import { OperationOutcomeModel } from '../../../shared/models/domain-resources/OperationOutcomeModel'
import { OrganizationRepository } from '../application/contracts/OrganizationRepository'

@ApiTags('Organization')
@Controller('R4/Organization')
export class FindOrganizationController {
  constructor(@Inject('OrganizationRepository') private readonly organizationRepository: OrganizationRepository) {}

  @ApiOperation({ summary: 'Récupère une organisation depuis son identifiant unique.' })
  @ApiOkResponse({ description: 'Une organisation a été trouvée' })
  @ApiNotFoundResponse({ description: 'Aucune organisation n’a été trouvée' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get(':id')
  async execute(@Param('id') id: string, @Res() response: Response): Promise<void> {
    const document: Organization[] = await this.organizationRepository.find(id)

    if (document.length !== 0) {
      response.json(document.filter((organization: Organization) => organization.id === id)[0])
    } else {
      const operationOutcome = OperationOutcomeModel.create('No organization fund')
      response.status(404).json(operationOutcome)
    }
  }
}
