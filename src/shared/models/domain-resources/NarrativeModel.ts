import { Narrative } from 'fhir/r4'

import { EclaireDto } from '../../../etl/dto/EclaireDto'

export class NarrativeModel implements Narrative {
  constructor(
    readonly div: string,
    readonly status: 'generated' | 'extensions' | 'additional' | 'empty'
  ) {}

  static create(data: EclaireDto, status: 'generated' | 'extensions' | 'additional' | 'empty') {
    const htmlAsString = `<div xmlns="http://www.w3.org/1999/xhtml">${data.toHtml()}</div>`
    return new NarrativeModel(htmlAsString, status)
  }
}
