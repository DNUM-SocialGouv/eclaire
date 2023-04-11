import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

import { TitleModel } from './TitleModel'

export class ClinicalTrialModel {
  constructor(clinicalTrialModel: ClinicalTrialModel) {
    Object.assign(this, clinicalTrialModel)
  }

  // TODO: transférer @ApiProperty() dans l'entity ?
  @ApiHideProperty()
  readonly uuid: string

  @ApiProperty()
  readonly public_title: TitleModel

  @ApiProperty()
  readonly scientific_title: TitleModel
}
