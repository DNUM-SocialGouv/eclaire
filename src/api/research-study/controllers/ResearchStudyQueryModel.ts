import { ApiProperty } from '@nestjs/swagger'

export class ResearchStudyQueryModel {
  @ApiProperty({ description: 'ex : 2022-500014-26-00 (CTIS), 2021-A01861-40 (DM), 2021-000304-38 (JARDE)', required: false })
    identifier: string

  @ApiProperty({ description: 'completed | approved | active | temporarily-closed-to-accrual | administratively-completed', required: false })
    status: string

  @ApiProperty({ description: 'ex : (eq|ne|lt|le|gt)2019-10-18', required: false })
    _lastUpdated: string

  @ApiProperty({ description: 'ex : meta.lastUpdated', required: false })
    _sort: string

  @ApiProperty({ description: 'ex : mot1 AND (mot2 OR mot3)', required: false })
    _text: string

  @ApiProperty({ description: 'ex : mot1 AND (mot2 OR mot3)', required: false })
    _content: string
}
