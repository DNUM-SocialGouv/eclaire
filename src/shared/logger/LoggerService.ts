/* eslint-disable no-console */
import { Injectable } from '@nestjs/common'

@Injectable()
export class LoggerService {
  info(message: string) {
    console.info(`[ECLAIRE] ${message}`)
  }

  error(message: string) {
    console.error(`[ECLAIRE] ${message}`)
  }
}
