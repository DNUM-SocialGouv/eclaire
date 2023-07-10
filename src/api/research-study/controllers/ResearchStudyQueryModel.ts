import { ApiProperty } from '@nestjs/swagger'

export class ResearchStudyQueryModel {
  @ApiProperty({ description: 'example: 2022-500014-26-00, 2021-A01861-40, 2021-000304-38', required: false })
    identifier: string

  @ApiProperty({ description: 'example: active', required: false })
    status: string

  @ApiProperty({ description: 'example: gt2019-10-18', required: false })
    _lastUpdated: string

  @ApiProperty({ description: 'example: meta.lastUpdated', required: false })
    _sort: string

  @ApiProperty({ description: 'example: elastic AND (lucene OR solr)', required: false })
    _text: string

  @ApiProperty({ description: 'example: elastic AND (lucene OR solr)', required: false })
    _content: string
}
