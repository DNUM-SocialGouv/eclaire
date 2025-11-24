import { DeeplTranslator } from './DeeplTranslator'
import { TranslationService, TranslatedTexts } from './TranslationService'
import { TranslationResponse } from './Translator'

describe('translation service', () => {
  it('should read the Deepl API', async () => {
    // GIVEN
    const translator: DeeplTranslator = new DeeplTranslator('fake_access_key')
    const translationService: TranslationService = new TranslationService(translator)

    vi.spyOn(translator, 'translateText').mockResolvedValueOnce([
      { detected_source_language: 'en', text: 'Je vais bien' },
      { detected_source_language: 'en', text: 'Comment allez vous ?' },
      { detected_source_language: 'en', text: 'Bonjour le monde !' },
    ] as TranslationResponse[])

    // WHEN
    const result: TranslatedTexts = await translationService.execute([
      'I am fine',
      'How are you?',
      'Hello, world!',
    ], 0)

    // THEN
    expect(translator.translateText).toHaveBeenCalledWith(
      [
        'I am fine',
        'How are you?',
        'Hello, world!',
      ]
    )
    expect(result).toStrictEqual({
      'diseaseCondition-1': 'Je vais bien',
      'therapeuticArea-1': 'Comment allez vous ?',
      'title-1': 'Bonjour le monde !',
    } as TranslatedTexts)
  })

  it('should read the Deepl API when there is no data to translate', async () => {
    // GIVEN
    const translator: DeeplTranslator = new DeeplTranslator('fake_access_key')
    const translationService: TranslationService = new TranslationService(translator)

    vi.spyOn(translator, 'translateText').mockResolvedValueOnce([] as TranslationResponse[])

    // WHEN
    const result: TranslatedTexts = await translationService.execute(['', '', ''], 0)

    // THEN
    expect(translator.translateText).toHaveBeenCalledWith(
      ['', '', '']
    )
    expect(result).toStrictEqual({
      'diseaseCondition-1': '',
      'therapeuticArea-1': '',
      'title-1': '',
    } as TranslatedTexts)
  })
})
