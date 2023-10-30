import { Controller, Get, Header, Inject, Param, Res } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { Group } from 'fhir/r4'

import { OperationOutcomeModel } from '../../../shared/models/domain-resources/OperationOutcomeModel'
import { GroupRepository } from '../application/contracts/GroupRepository'

@ApiTags('Group')
@Controller('R4/Group')
export class FindGroupController {
  constructor(@Inject('GroupRepository') private readonly groupRepository: GroupRepository) {}

  @ApiOperation({ summary: "Récupère les modalités d'un groupe d'inscription depuis son identifiant unique." })
  @ApiOkResponse({ description: "Un groupe d'inscription a été trouvé." })
  @ApiNotFoundResponse({ description: "Aucun groupe d'inscription n’a été trouvé." })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get(':id')
  async execute(@Param('id') id: string, @Res() response: Response): Promise<void> {
    const document: Group = await this.groupRepository.find(id)

    if (document) {
      response.json(document)
    } else {
      const operationOutcome = OperationOutcomeModel.create('No enrollment group fund')
      response.status(404).json(operationOutcome)
    }
  }
}
