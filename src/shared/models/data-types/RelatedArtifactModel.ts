import { Attachment, RelatedArtifact } from 'fhir/r4'

import { ModelUtils } from '../eclaire/ModelUtils'

export class RelatedArtifactModel implements RelatedArtifact {
  private constructor(
    readonly citation: string | undefined,
    readonly display: string | undefined,
    readonly document: Attachment | undefined,
    readonly label: string | undefined,
    readonly resource: string | undefined,
    readonly type: 'documentation' | 'justification' | 'citation' | 'predecessor' | 'successor' | 'derived-from' | 'depends-on' | 'composed-of',
    readonly url: string | undefined
  ) {}

  static create(data: string): RelatedArtifactModel {
    if (data === ModelUtils.UNAVAILABLE) return undefined

    return new RelatedArtifactModel(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      'documentation',
      undefined
    )
  }
}
