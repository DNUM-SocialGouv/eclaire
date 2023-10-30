import { Controller, Get, Header, Inject, Param, Res } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { Location } from 'fhir/r4'

import { OperationOutcomeModel } from '../../../shared/models/domain-resources/OperationOutcomeModel'
import { LocationRepository } from '../application/contracts/LocationRepository'

@ApiTags('Location')
@Controller('R4/Location')
export class FindLocationController {
  constructor(@Inject('LocationRepository') private readonly locationRepository: LocationRepository) {}

  @ApiOperation({ summary: 'Récupère un site depuis son identifiant unique.' })
  @ApiOkResponse({ description: 'Un site a été trouvée' })
  @ApiNotFoundResponse({ description: 'Aucun site n’a été trouvée' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get(':id')
  async execute(@Param('id') id: string, @Res() response: Response): Promise<void> {
    const document: Location[] = await this.locationRepository.find(id)

    if (document.length !== 0) {
      response.json(document.filter((location: Location) => location.id === id)[0])
    } else {
      const operationOutcome = OperationOutcomeModel.create('No location fund')
      response.status(404).json(operationOutcome)
    }
  }
}
