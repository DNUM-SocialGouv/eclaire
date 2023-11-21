import { TranslationResponse, Translator } from './Translator'

export class LocalTranslator implements Translator {
  async translateText(texts: string[]): Promise<TranslationResponse[]> {
    return Promise.resolve([
      {
        detected_source_language: 'EN',
        text: '[Traduction locale] ' + texts[0],
      },
      {
        detected_source_language: 'EN',
        text: '[Traduction locale] ' + texts[1],
      },
      {
        detected_source_language: 'EN',
        text: '[Traduction locale] ' + texts[2],
      },
    ])
  }
}
