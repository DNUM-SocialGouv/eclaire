import { TranslationResponse, Translator } from './Translator'

export class LocalTranslator implements Translator {
  async translateText(texts: string[]): Promise<TranslationResponse[]> {
    return Promise.resolve(
      texts.map((t) => ({
        detected_source_language: 'EN',
        text: t && t.trim().length ? `[Traduction locale] ${t}` : '',
      }))
    )
  }
}
