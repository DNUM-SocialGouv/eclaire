import { DeeplTranslator } from './DeeplTranslator'
import { TranslationService, TextsToTranslate, TranslatedTexts } from './TranslationService'
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
    const result: TextsToTranslate = await translationService.execute({
      diseaseCondition: 'I am fine',
      therapeuticArea: 'How are you?',
      title: 'Hello, world!',
    })

    // THEN
    expect(translator.translateText).toHaveBeenCalledWith(
      [
        'I am fine',
        'How are you?',
        'Hello, world!',
      ]
    )
    expect(result).toStrictEqual({
      diseaseCondition: 'Je vais bien',
      therapeuticArea: 'Comment allez vous ?',
      title: 'Bonjour le monde !',
    } as TranslatedTexts)
  })

  it('should read the Deepl API when there is no data to translate', async () => {
    // GIVEN
    const translator: DeeplTranslator = new DeeplTranslator('fake_access_key')
    const translationService: TranslationService = new TranslationService(translator)

    vi.spyOn(translator, 'translateText').mockResolvedValueOnce([] as TranslationResponse[])

    // WHEN
    const result: TextsToTranslate = await translationService.execute({
      diseaseCondition: '',
      therapeuticArea: '',
      title: '',
    })

    // THEN
    expect(translator.translateText).toHaveBeenCalledWith(
      ['', '', '']
    )
    expect(result).toStrictEqual({
      diseaseCondition: '',
      therapeuticArea: '',
      title: '',
    } as TranslatedTexts)
  })
})
