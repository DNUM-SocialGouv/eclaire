import fetch, { BodyInit, HeadersInit, RequestInit, Response } from 'node-fetch'

export class DeeplTranslator {
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

    const response: Response = await fetch(url, {
      body,
      headers,
      method: 'POST',
    } satisfies RequestInit)

    const result = await response.json() as TranslationsResponse

    return result['translations']
  }
}

export type TranslationsResponse = Readonly<{
  translations: TranslationResponse[]
}>

export type TranslationResponse = Readonly<{
  detected_source_language: string
  text: string
}>
