import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { Title } from './Title'

export class ClinicalTrial {
  constructor(partial: Partial<ClinicalTrial>) {
    Object.assign(this, partial)
  }

  @ApiHideProperty()
  readonly uuid: string

  @ApiProperty()
  readonly public_title: Title

  @ApiProperty()
  readonly scientific_title: Title
}
