import { ApiProperty } from '@nestjs/swagger'

export class FhirQueryParams {
  @ApiProperty({
    description: 'e.g. CTIS : `2022-500014-26-00` | DM : `2021-A01861-40` | JARDE : `2021-000304-38`',
    required: false,
  })
    identifier: string

  @ApiProperty({
    description: '`completed` | `approved` | `active` | `temporarily-closed-to-accrual` | `administratively-completed`',
    required: false,
  })
    status: string

  @ApiProperty({
    description: '`*`',
    required: false,
  })
    _include: string

  @ApiProperty({
    description: 'e.g. : (`eq` | `ne` | `lt` | `le` | `gt` | `ge`)`2019-10-18`',
    required: false,
  })
    _lastUpdated: string

  @ApiProperty({
    description: '`meta.lastUpdated`',
    required: false,
  })
    _sort: string

  @ApiProperty({
    description: 'e.g. : `mot1 AND (mot2 OR mot3)`',
    required: false,
  })
    _text: string

  @ApiProperty({
    description: 'e.g. : `mot1 AND (mot2 OR mot3)`',
    required: false,
  })
    _content: string

  @ApiProperty({
    description: 'De `1` à `1000`, valeur par défaut `20` si vide',
    maximum: 1000,
    minimum: 1,
    required: false,
  })
    _count: number

  _getpagesoffset: string
  search_after: string

  static parse(query: FhirQueryParams): FhirParsedQueryParams[] {
    return Object
      .entries(query)
      .map((key: [string, string]): FhirParsedQueryParams => {
        return { name: key[0], value: key[1] }
      })
  }
}

export type FhirParsedQueryParams = Readonly<{
  name: string
  value: string
}>
