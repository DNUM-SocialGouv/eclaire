import { DeeplService } from '../../translation/DeeplService'
import { DeeplTranslator } from 'src/shared/translation/DeeplTranslator'

export function setupTranslationService(): DeeplService {
  const translator: DeeplTranslator = new DeeplTranslator('fake-auth-key')
  return new DeeplService(translator)
}
