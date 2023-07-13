import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Query, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express'

import { ResearchStudyQueryModel } from './ResearchStudyQueryModel'
import { Public } from '../../auth/public.decorator'
import { BundleModelFactory } from '../application/entities/BundleModelFactory'
import { OperationOutcomeModelFactory } from '../application/entities/OperationOutcomeModelFactory'
import { researchStudyQueryToElasticsearchQuery } from '../controllers/converter/researchStudyQueryToElasticsearchQuery'
import { EsResearchStudyRepository } from '../gateways/EsResearchStudyRepository'

@ApiTags('Research study')
@Controller('R4/ResearchStudy')
export class SearchResearchStudyController {
  constructor(private readonly researchStudyRepository: EsResearchStudyRepository) {}

  @ApiOperation({ summary: 'Recherche des essais cliniques selon un ou des filtres.' })
  @ApiOkResponse({ description: 'Des essais cliniques ont été trouvés', type: BundleModelFactory })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Public()
  @Get()
  async execute(@Query() researchStudyQuery: ResearchStudyQueryModel, @Res() response: Response): Promise<void> {
    try {
      response.json(await this.researchStudyRepository.search(researchStudyQueryToElasticsearchQuery(researchStudyQuery)))
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        response.status(400).json(OperationOutcomeModelFactory.create(error.meta.body.error.root_cause[0].reason))
      } else {
        throw error
      }
    }
  }
}
