import { TextResult, Translator } from 'deepl-node'

import { DeeplService } from './DeeplService'

describe('deepl service', () => {
  it('should read the Deepl API', async () => {
    // GIVEN
    const translator: Translator = new Translator('fake_access_key')
    const deeplService: DeeplService = new DeeplService(translator)

    vi.spyOn(translator, 'translateText').mockResolvedValueOnce([
      { detectedSourceLang: 'en', text: 'Bonjour le monde !' },
      { detectedSourceLang: 'en', text: 'Comment allez vous ?' },
    ] as TextResult[])

    // WHEN
    const result: string[] = await deeplService.translate(['Hello, world!', 'How are you?'])

    // THEN
    expect(translator.translateText).toHaveBeenCalledWith(
      ['Hello, world!', 'How are you?'],
      null,
      'fr',
      { formality: 'prefer_more' }
    )
    expect(result).toStrictEqual(['Bonjour le monde !', 'Comment allez vous ?'])
  })
})
