import { TranslationResponse, Translator } from './Translator'

export class TranslationService {
  constructor(private readonly translator: Translator) { }

  async execute(texts: string[], step: number): Promise<TranslatedTexts> {
    const results: TranslationResponse[] = await this.translator.translateText(
      texts
    )

    if (!results || results.length === 0) {
      return {
        'diseaseCondition-1': '',
        'therapeuticArea-1': '',
        'title-1': '',
      }
    }

    const output: Partial<TranslatedTexts> = {}
    const baseKeys: BaseKeys[] = ['diseaseCondition', 'therapeuticArea', 'title']
    // Chaque "groupe" de 3 correspond à un set complet
    const groupCount = Math.floor(results.length / baseKeys.length)

    for (let i = 0; i < groupCount; i++) {
      baseKeys.forEach((key, j) => {
        const resultIndex = i * baseKeys.length + j;
        (output as any)[`${key}-${i + 1 + step}`] = results[resultIndex]?.text ?? ''
      })
    }
    return output as TranslatedTexts
  }


  async executeCtis(texts: TextsToTranslate): Promise<TranslatedTextsCtis> {
    const {
      diseaseCondition,
      therapeuticArea,
      title,
      judgmentCriteria = [],
      eligibilityCriteria = [],
    } = texts

    // 1 Construct the complete table to be translated
    const allTexts: string[] = [
      diseaseCondition,
      therapeuticArea,
      title,
      ...judgmentCriteria,
      ...eligibilityCriteria,
    ]

    if (!allTexts.length) {
      return {
        diseaseCondition: '',
        therapeuticArea: '',
        title: '',
        judgmentCriteria: [],
        eligibilityCriteria: [],
      }
    }

    const MAX_BATCH_SIZE = 100 // the maximum number of texts to translate per API call on DeepL
    const translatedResults: string[] = []

    // 2 Cut into 100 chunks
    for (let i = 0; i < allTexts.length; i += MAX_BATCH_SIZE) {
      const chunk = allTexts.slice(i, i + MAX_BATCH_SIZE)

      const results: TranslationResponse[] =
        await this.translator.translateText(chunk)

      if (results && results.length > 0) {
        translatedResults.push(...results.map(r => r.text))
      }
    }

    if (translatedResults.length === 0) {
      return {
        diseaseCondition: '',
        therapeuticArea: '',
        title: '',
        judgmentCriteria: [],
        eligibilityCriteria: [],
      }
    }

    // 3 Reconstruct the translated data
    const diseaseConditionTranslated = translatedResults[0] ?? ''
    const therapeuticAreaTranslated = translatedResults[1] ?? ''
    const titleTranslated = translatedResults[2] ?? ''

    const judgmentStartIndex = 3
    const judgmentEndIndex = judgmentStartIndex + judgmentCriteria.length

    const translatedJudgmentCriteria = translatedResults.slice(
      judgmentStartIndex,
      judgmentEndIndex
    )

    const translatedEligibilityCriteria = translatedResults.slice(
      judgmentEndIndex,
      judgmentEndIndex + eligibilityCriteria.length
    )

    return {
      diseaseCondition: diseaseConditionTranslated,
      therapeuticArea: therapeuticAreaTranslated,
      title: titleTranslated,
      judgmentCriteria: translatedJudgmentCriteria,
      eligibilityCriteria: translatedEligibilityCriteria,
    }
  }
}

export type TextsToTranslate = {
  diseaseCondition: string,
  therapeuticArea: string,
  title: string,
  judgmentCriteria?: string[],
  eligibilityCriteria?: string[]
}

// Clés “de base” pour chaque groupe
type BaseKeys = 'diseaseCondition' | 'therapeuticArea' | 'title';

export type TextsToTranslateDynamique = {
  [K in `${BaseKeys}-${number}`]: string;
}
export type TranslatedTexts = TextsToTranslateDynamique

export type TextsToTranslateCtis = {
  diseaseCondition: string,
  therapeuticArea: string,
  title: string,
  judgmentCriteria: string[],
  eligibilityCriteria: string[],
}
export type TranslatedTextsCtis = TextsToTranslateCtis
