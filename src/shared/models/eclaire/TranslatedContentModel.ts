export class TranslatedContentModel {
  private constructor(
    readonly diseaseCondition: string | undefined,
    readonly therapeuticArea: string | undefined,
    readonly title: string | undefined,    
    readonly judgmentCriteria?:string[] | undefined,
    readonly eligibilityCriteria?: string[] | undefined
  ) {}

  static create(
    diseaseCondition: string,
    therapeuticArea: string,
    title: string,
    judgmentCriteria?:string[],
    eligibilityCriteria?: string[] 
  ): TranslatedContentModel {
    return new TranslatedContentModel(
      diseaseCondition,
      therapeuticArea,
      title,
      judgmentCriteria,
      eligibilityCriteria
    )
  }
}
