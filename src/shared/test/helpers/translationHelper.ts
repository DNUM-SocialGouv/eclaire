import { TranslationService } from '../../translation/TranslationService'
import { DeeplTranslator } from 'src/shared/translation/DeeplTranslator'

export function setupTranslationService(): TranslationService {
  const translator: DeeplTranslator = new DeeplTranslator('fake-auth-key')
  return new TranslationService(translator)
}
