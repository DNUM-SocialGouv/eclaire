import { DeeplService, TextsToTranslate, TranslatedTexts } from './DeeplService'
import { DeeplTranslator, TranslationResponse } from './DeeplTranslator'

describe('deepl service', () => {
  it('should read the Deepl API', async () => {
    // GIVEN
    const translator: DeeplTranslator = new DeeplTranslator('fake_access_key')
    const deeplService: DeeplService = new DeeplService(translator)

    vi.spyOn(translator, 'translateText').mockResolvedValueOnce([
      { detected_source_language: 'en', text: 'Je vais bien' },
      { detected_source_language: 'en', text: 'Comment allez vous ?' },
      { detected_source_language: 'en', text: 'Bonjour le monde !' },
    ] as TranslationResponse[])

    // WHEN
    const result: TextsToTranslate = await deeplService.execute({
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
})
