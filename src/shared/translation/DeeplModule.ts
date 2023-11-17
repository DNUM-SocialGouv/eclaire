import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Translator } from 'deepl-node'

import { DeeplService } from './DeeplService'

@Module({
  exports: [DeeplService],
  providers: [
    {
      inject: [ConfigService],
      provide: DeeplService,
      useFactory: (configService: ConfigService): DeeplService => {
        const authKey = configService.get<string>('DEEPL_AUTH_KEY') || 'blah'
        const translator: Translator = new Translator(authKey)
        return new DeeplService(translator)
      },
    },
  ],
})
export class DeeplModule {}
