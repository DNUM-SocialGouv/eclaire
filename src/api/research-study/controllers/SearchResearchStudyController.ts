import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Query, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express'

import { ResearchStudyQueryModel } from './ResearchStudyQueryModel'
import { OperationOutcomeModel } from '../application/entities/OperationOutcomeModel'
import { researchStudyQueryToElasticsearchQuery } from '../controllers/converter/researchStudyQueryToElasticsearchQuery'
import { EsResearchStudyRepository } from '../gateways/EsResearchStudyRepository'

@ApiTags('Research study')
@Controller('R4/ResearchStudy')
export class SearchResearchStudyController {
  constructor(private readonly researchStudyRepository: EsResearchStudyRepository) {}

  @ApiOperation({ summary: 'Recherche des essais cliniques selon un ou des filtres.' })
  @ApiOkResponse({ description: 'Des essais cliniques ont été trouvés' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get()
  async execute(@Query() researchStudyQuery: ResearchStudyQueryModel, @Res() response: Response): Promise<void> {
    try {
      const queryParams = this.transform(researchStudyQuery)

      response.json(await this.researchStudyRepository.search(researchStudyQueryToElasticsearchQuery(researchStudyQuery), queryParams))
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        response.status(400).json(OperationOutcomeModel.create(error.meta.body.error.root_cause[0].reason))
      } else {
        throw error
      }
    }
  }

  private transform(researchStudyQuery: ResearchStudyQueryModel) {
    const queryParams: { name: string, value: string }[] = []

    for (const [key, value] of Object.entries(researchStudyQuery)) {
      queryParams.push({ name: key, value: value as string })
    }

    return queryParams
  }
}
