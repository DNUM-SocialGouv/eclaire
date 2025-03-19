import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'
import { join } from 'path'

@Injectable()
export class JsonFileReaderService {
  read(fileName: string): unknown {
    const filePath = join(__dirname + '/.data', fileName)
    const textContent = readFileSync(filePath, 'utf8')
    return JSON.parse(textContent)
  }
}
