import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import { join } from 'path'

@Injectable()
export class ReaderService {
  read(fileName: string): unknown {
    const filePath = join(__dirname + '../../../etl/.data', fileName)
    const textContent = readFileSync(filePath, 'utf8')
    return JSON.parse(textContent)
  }
}
