import { HttpException, HttpStatus } from '@nestjs/common'

export class ElasticsearchServiceErrorsException extends HttpException {
  constructor(message?: string, status?: number) {
    super(message ?? 'An unhandled error occurred - elasticsearch.service', status ?? HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
