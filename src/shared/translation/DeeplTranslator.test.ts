import fetch, { BodyInit, HeadersInit } from 'node-fetch'

import { DeeplTranslator } from './DeeplTranslator'

vi.mock('node-fetch')

describe('deepl translator', () => {
  it('should read the Deepl API', async () => {
    // GIVEN
    const translator: DeeplTranslator = new DeeplTranslator('fake_access_key')

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fetch.mockResolvedValue({
      json: () => ([
        { detected_source_language: 'en', text: 'Je vais bien' },
        { detected_source_language: 'en', text: 'Comment allez vous ?' },
        { detected_source_language: 'en', text: 'Bonjour le monde !' },
      ]),
    })

    // WHEN
    await translator.translateText([
      'I am fine',
      'How are you?',
      'Hello, world!',
    ])

    // THEN
    const headers: HeadersInit = {
      Authorization: 'DeepL-Auth-Key fake_access_key',
      'Content-Type': 'application/json',
    }
    const body: BodyInit = JSON.stringify({
      options: { formality: 'prefer_more' },
      target_lang: 'FR',
      text: [
        'I am fine',
        'How are you?',
        'Hello, world!',
      ],
    })
    const url = 'https://api.deepl.com/v2/translate'
    expect(fetch).toHaveBeenCalledWith(
      url,
      {
        body,
        headers,
        method: 'POST',
      }
    )
  })
})
