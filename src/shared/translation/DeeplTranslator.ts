import https from 'https'
import fetch, { BodyInit, HeadersInit, RequestInit, Response } from 'node-fetch'

import { TranslationResponse, TranslationsResponse, Translator } from './Translator'

export class DeeplTranslator implements Translator {
  constructor(readonly authKey: string) {}

  async translateText(texts: string[]): Promise<TranslationResponse[]> {
    const headers: HeadersInit = {
      Authorization: `DeepL-Auth-Key ${this.authKey}`,
      'Content-Type': 'application/json',
    }
    const body: BodyInit = JSON.stringify({
      options: { formality: 'prefer_more' },
      target_lang: 'FR',
      text: texts,
    })
    const url = 'https://api.deepl.com/v2/translate'
    const agent = new https.Agent({ keepAlive: true })
    const response: Response = await fetch(url, {
      agent,
      body,
      headers,
      method: 'POST',
    } satisfies RequestInit)

    const result = await response.json() as TranslationsResponse

    return result['translations']
  }
}
