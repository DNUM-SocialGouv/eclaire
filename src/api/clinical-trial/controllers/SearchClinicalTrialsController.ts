import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express'

import { Public } from '../../auth/public.decorator'
import { SearchResponse } from '../application/entities/SearchResponse'
import { EsClinicalTrialRepository } from '../gateways/es-repository/EsClinicalTrialRepository'

class MatchDto {
  @ApiProperty()
    match: Record<string, string | number>
}

class TermDto {
  @ApiProperty()
    term: Record<string, string | number>
}

class SearchDto {
  @ApiProperty()
    query: TermDto | MatchDto
}

@ApiTags('Clinical Trial')
@Controller('search')
export class SearchClinicalTrialsController {
  constructor(private readonly clinicalTrialRepository: EsClinicalTrialRepository) {}

  @ApiOperation({ summary: 'Recherche des essais cliniques selon un ou des filtres.' })
  @ApiOkResponse({ description: 'Des essais cliniques ont été trouvés', type: SearchResponse })
  @Public()
  @Post()
  async execute(@Body() body: SearchDto, @Res() res: Response): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.json(await this.clinicalTrialRepository.search(body))
  }
}
