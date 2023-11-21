import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { DeeplTranslator } from './DeeplTranslator'
import { LocalTranslator } from './LocalTranslator'
import { TranslationService } from './TranslationService'
import { Translator } from './Translator'

@Module({
  exports: [TranslationService],
  providers: [
    {
      inject: [ConfigService],
      provide: TranslationService,
      useFactory: (configService: ConfigService): TranslationService => {
        const authKey = configService.get<string>('DEEPL_AUTH_KEY')
        let translator: Translator

        if (authKey) {
          translator = new DeeplTranslator(authKey)
        } else {
          translator = new LocalTranslator()
        }

        return new TranslationService(translator)
      },
    },
  ],
})
export class TranslationModule {}
