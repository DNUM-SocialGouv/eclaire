import { SourceLanguageCode, TargetLanguageCode, TextResult, TranslateTextOptions, Translator } from 'deepl-node'

export class DeeplService {
  constructor(private readonly translator: Translator) {}

  async execute(texts: TextsToTranslate): Promise<TranslatedTexts> {
    const sourceLang: SourceLanguageCode = null
    const targetLang: TargetLanguageCode = 'fr'
    const options: TranslateTextOptions = { formality: 'prefer_more' }

    const results: TextResult[] = await this.translator.translateText(
      [
        texts.diseaseCondition,
        texts.therapeuticArea,
        texts.title,
      ],
      sourceLang,
      targetLang,
      options
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
