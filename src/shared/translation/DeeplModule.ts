import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { DeeplService } from './DeeplService'
import { DeeplTranslator } from './DeeplTranslator'

@Module({
  exports: [DeeplService],
  providers: [
    {
      inject: [ConfigService],
      provide: DeeplService,
      useFactory: (configService: ConfigService): DeeplService => {
        const authKey = configService.get<string>('DEEPL_AUTH_KEY')
        const translator: DeeplTranslator = new DeeplTranslator(authKey)
        return new DeeplService(translator)
      },
    },
  ],
})
export class DeeplModule {}
