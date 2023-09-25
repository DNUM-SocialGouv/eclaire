import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Query, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { researchStudyQueryParamsToElasticsearchQuery } from './converter/researchStudyQueryParamsToElasticsearchQuery'
import { ResearchStudyQueryModel } from './ResearchStudyQueryModel'
import { OperationOutcomeModel } from '../application/entities/OperationOutcomeModel'
import { EsResearchStudyRepository } from '../gateways/EsResearchStudyRepository'

@ApiTags('Research study')
@Controller('R4/ResearchStudy')
export class SearchResearchStudyController {
  constructor(private readonly researchStudyRepository: EsResearchStudyRepository) {}

  @ApiOperation({
    description: 'Seuls les paramètres ci-dessous sont pour le moment disponible.<br>Les autres seront développés au besoin dans une démarche itérative.<br>Documentation FHIR sur <a href="https://hl7.org/fhir/R4/search.html">les filtres de recherche</a>.',
    summary: 'Recherche des essais cliniques selon un ou plusieurs filtres.',
  })
  @ApiOkResponse({ description: 'Des essais cliniques ont été trouvés' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get()
  async execute(@Query() researchStudyQuery: ResearchStudyQueryModel, @Res() response: Response): Promise<void> {
    try {
      const researchStudyQueryParams = ResearchStudyQueryModel.transform(researchStudyQuery)

      const elasticsearchBody = researchStudyQueryParamsToElasticsearchQuery(researchStudyQueryParams)
      const fhirResourceBundle = await this.researchStudyRepository.search(elasticsearchBody, researchStudyQueryParams)

      response.json(fhirResourceBundle)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        const operationOutcome = OperationOutcomeModel.create(error.meta.body.error.root_cause[0].reason)
        response.status(400).json(operationOutcome)
      } else {
        throw error
      }
    }
  }
}
