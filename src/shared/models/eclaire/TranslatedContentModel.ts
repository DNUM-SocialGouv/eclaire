export class TranslatedContentModel {
  private constructor(
    readonly diseaseCondition: string | undefined,
    readonly therapeuticArea: string | undefined,
    readonly title: string | undefined
  ) {}

  static create(
    diseaseCondition: string,
    therapeuticArea: string,
    title: string
  ): TranslatedContentModel {
    return new TranslatedContentModel(
      diseaseCondition,
      therapeuticArea,
      title
    )
  }
}
