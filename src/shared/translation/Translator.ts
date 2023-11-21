export interface Translator {
  translateText(texts: string[]): Promise<TranslationResponse[]>
}

export type TranslationsResponse = Readonly<{
  translations: TranslationResponse[]
}>

export type TranslationResponse = Readonly<{
  detected_source_language: string
  text: string
}>
