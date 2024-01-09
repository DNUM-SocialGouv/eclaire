export class OriginalContentsToEnhanceModel {
  private constructor(
    readonly meddraCodes: string[]
  ) {}

  static create(
    meddraCodes: string[]
  ): OriginalContentsToEnhanceModel {
    return new OriginalContentsToEnhanceModel(
      meddraCodes
    )
  }
}
