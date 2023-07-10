import { Narrative } from 'fhir/r4'

export class NarrativeModel implements Narrative {
  constructor(
    readonly div: string,
    readonly id: string | undefined,
    readonly status: 'generated' | 'extensions' | 'additional' | 'empty'
  ) {}
}
