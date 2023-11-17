import { TextResult, Translator } from 'deepl-node'

import { DeeplService, TextsToTranslate, TranslatedTexts } from './DeeplService'

describe('deepl service', () => {
  it('should read the Deepl API', async () => {
    // GIVEN
    const translator: Translator = new Translator('fake_access_key')
    const deeplService: DeeplService = new DeeplService(translator)

    vi.spyOn(translator, 'translateText').mockResolvedValueOnce([
      { detectedSourceLang: 'en', text: 'Je vais bien' },
      { detectedSourceLang: 'en', text: 'Comment allez vous ?' },
      { detectedSourceLang: 'en', text: 'Bonjour le monde !' },
    ] as TextResult[])

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
      ],
      null,
      'fr',
      { formality: 'prefer_more' }
    )
    expect(result).toStrictEqual({
      diseaseCondition: 'Je vais bien',
      therapeuticArea: 'Comment allez vous ?',
      title: 'Bonjour le monde !',
    } as TranslatedTexts)
  })
})
