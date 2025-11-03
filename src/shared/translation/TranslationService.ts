import { TranslationResponse, Translator } from './Translator'

export class TranslationService {
  constructor(private readonly translator: Translator) { }

  async execute(texts: string[], step:number): Promise<TranslatedTexts> {
    const results: TranslationResponse[] = await this.translator.translateText(
      texts
    )

    if (!results || results.length === 0) {
      return {
        "diseaseCondition-1": '',
        "therapeuticArea-1": '',
        "title-1": '',
      };
    }

    const output: Partial<TranslatedTexts> = {};
    const baseKeys: BaseKeys[] = ['diseaseCondition', 'therapeuticArea', 'title'];
    // Chaque "groupe" de 3 correspond à un set complet
    const groupCount = Math.floor(results.length / baseKeys.length);

    for (let i = 0; i < groupCount; i++) {
      baseKeys.forEach((key, j) => {
        const resultIndex = i * baseKeys.length + j;
        (output as any)[`${key}-${i + 1 + step}`] = results[resultIndex]?.text ?? '';
      });
    }
    return output as TranslatedTexts;
  }
}

export type TextsToTranslate = {
  diseaseCondition: string,
  therapeuticArea: string,
  title: string,
}

// Clés “de base” pour chaque groupe
type BaseKeys = 'diseaseCondition' | 'therapeuticArea' | 'title';

export type TextsToTranslateDynamique = {
  [K in `${BaseKeys}-${number}`]: string;
}

export type TranslatedTexts = TextsToTranslateDynamique
