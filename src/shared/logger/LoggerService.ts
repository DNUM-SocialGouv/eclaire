/* eslint-disable no-console */
export class LoggerService {
  info(message: string) {
    console.info(`[ECLAIRE] ${message}`)
  }

  error(message: string) {
    console.error(`[ECLAIRE] ${message}`)
  }
}
