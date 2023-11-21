import { TranslationResponse, Translator } from './Translator'

export class TranslationService {
  constructor(private readonly translator: Translator) {}

  async execute(texts: TextsToTranslate): Promise<TranslatedTexts> {
    const results: TranslationResponse[] = await this.translator.translateText(
      [
        texts.diseaseCondition,
        texts.therapeuticArea,
        texts.title,
      ]
    )

    return {
      diseaseCondition: results[0].text,
      therapeuticArea: results[1].text,
      title: results[2].text,
    }
  }
}

export type TextsToTranslate = {
  diseaseCondition: string,
  therapeuticArea: string,
  title: string,
}

export type TranslatedTexts = TextsToTranslate
