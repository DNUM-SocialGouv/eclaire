export class OriginalLanguageContentModel {
  private constructor(
    readonly diseaseCondition: string | undefined,
    readonly therapeuticArea: string | undefined,
    readonly title: string | undefined
  ) {}

  static create(
    diseaseCondition: string,
    therapeuticArea: string,
    title: string
  ): OriginalLanguageContentModel {
    return new OriginalLanguageContentModel(
      diseaseCondition,
      therapeuticArea,
      title
    )
  }
}
