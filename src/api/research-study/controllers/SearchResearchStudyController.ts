import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Inject, Query, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { Bundle, OperationOutcome } from 'fhir/r4'

import { FhirParsedQueryParams, FhirQueryParams } from './FhirQueryParams'
import { OperationOutcomeModel } from '../../../shared/models/domain-resources/OperationOutcomeModel'
import { ResearchStudyRepository } from '../application/ResearchStudyRepository'

@ApiTags('Research study')
@Controller('R4/ResearchStudy')
export class SearchResearchStudyController {
  constructor(
    @Inject('ResearchStudyRepository') private readonly researchStudyRepository: ResearchStudyRepository
  ) {}

  @ApiOperation({
    description: 'Seuls les paramètres ci-dessous sont disponibles pour le moment.<br>Les autres seront développés au besoin dans une démarche itérative.<br>Documentation FHIR sur <a href="https://hl7.org/fhir/R4/search.html">les filtres de recherche</a>.',
    summary: 'Recherche des essais cliniques selon un ou plusieurs filtres.',
  })
  @ApiOkResponse({ description: 'Des essais cliniques ont été trouvés' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get()
  async execute(@Query() fhirQueryParams: FhirQueryParams, @Res() response: Response): Promise<void> {
    try {
      const fhirResourceBundle: Bundle = await this.generateBundle(fhirQueryParams)

      response.json(fhirResourceBundle)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        const operationOutcome: OperationOutcome = OperationOutcomeModel.create(error.meta.body.error['root_cause'][0].reason)
        response.status(400).json(operationOutcome)
      } else {
        throw error
      }
    }
  }

  async generateBundle(fhirQueryParams: FhirQueryParams): Promise<Bundle> {
    const fhirParsedQueryParams: FhirParsedQueryParams[] = FhirQueryParams.parse(fhirQueryParams)
    return await this.researchStudyRepository.search(fhirParsedQueryParams)
  }
}
