import { ApiProperty } from '@nestjs/swagger'

import { ResearchStudyQueryParams } from './converter/ResearchStudyQueryParams'

export class ResearchStudyQueryModel {
  @ApiProperty({ description: 'e.g. CTIS : 2022-500014-26-00, e.g. DM : 2021-A01861-40, e.g. JARDE : 2021-000304-38', required: false })
    identifier: string

  @ApiProperty({ description: 'completed | approved | active | temporarily-closed-to-accrual | administratively-completed', required: false })
    status: string

  @ApiProperty({ description: 'e.g. : (eq|ne|lt|le|gt)2019-10-18', required: false })
    _lastUpdated: string

  @ApiProperty({ description: 'meta.lastUpdated', required: false })
    _sort: string

  @ApiProperty({ description: 'e.g. : mot1 AND (mot2 OR mot3)', required: false })
    _text: string

  @ApiProperty({ description: 'e.g. : mot1 AND (mot2 OR mot3)', required: false })
    _content: string

  @ApiProperty({ description: 'De 1 à 5 000, valeur par défaut 20 si vide', required: false })
    _count: string

  _getpagesoffset: string
  search_after: string

  static transform(researchStudyQuery: ResearchStudyQueryModel): ResearchStudyQueryParams[] {
    return Object
      .entries(researchStudyQuery)
      .map((key: [string, string]): ResearchStudyQueryParams => {
        return { name: key[0], value: key[1] }
      })
  }
}
