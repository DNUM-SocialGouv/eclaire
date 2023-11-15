import { SourceLanguageCode, TargetLanguageCode, TextResult, TranslateTextOptions, Translator } from 'deepl-node'

export class DeeplService {
  constructor(private readonly translator: Translator) {}

  async translate(texts: string[]): Promise<string[]> {
    const sourceLang: SourceLanguageCode = null
    const targetLang: TargetLanguageCode = 'fr'
    const options: TranslateTextOptions = { formality: 'prefer_more' }

    const results: TextResult[] = await this.translator.translateText(texts, sourceLang, targetLang, options)

    return results.map((result: TextResult) => result.text)
  }
}
