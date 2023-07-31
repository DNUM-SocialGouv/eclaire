import { ApiProperty } from '@nestjs/swagger'

export class ResearchStudyQueryModel {
  @ApiProperty({ description: 'e.g. CTIS : 2022-500014-26-00, e.g. DM : 2021-A01861-40, e.g. JARDE : 2021-000304-38', required: false })
    identifier: string

  @ApiProperty({ description: 'completed | approved | active | temporarily-closed-to-accrual | administratively-completed', required: false })
    status: string

  @ApiProperty({ description: 'e.g. : (eq|ne|lt|le|gt)2019-10-18', required: false })
    _lastUpdated: string

  @ApiProperty({ description: 'e.g. : meta.lastUpdated', required: false })
    _sort: string

  @ApiProperty({ description: 'e.g. : mot1 AND (mot2 OR mot3)', required: false })
    _text: string

  @ApiProperty({ description: 'e.g. : mot1 AND (mot2 OR mot3)', required: false })
    _content: string

  @ApiProperty({ description: 'e.g. : 100, valeur par défaut 20 et maximum à 5 000', required: false })
    _count: string

  _getpagesoffset: string
  search_after: string
}
