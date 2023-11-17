import { Translator } from 'deepl-node'

import { DeeplService } from '../../translation/DeeplService'

export function setupTranslationService(): DeeplService {
  const translator: Translator = new Translator('fake-auth-key')
  return new DeeplService(translator)
}
