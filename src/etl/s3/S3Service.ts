import { GetObjectCommand, GetObjectCommandInput, S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'
import { Readable } from 'stream'
import { chain } from 'stream-chain'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'

export class S3Service {
  constructor(
    private readonly configService: ConfigService
  ) {}

  private createClient(): S3Client {
    const config: S3ClientConfig = {
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_KEY'),
      },
      endpoint: 'https://storage-eb4.cegedim.cloud',
      forcePathStyle: true,
      region: 'eb4',
    }

    return new S3Client(config)
  }

  async read(key: string): Promise<unknown> {
    const client = this.createClient()

    const input: GetObjectCommandInput = {
      Bucket: this.configService.get('S3_BUCKET'),
      Key: key,
    }
    const command = new GetObjectCommand(input)
    const response = await client.send(command)
    const data = await response.Body.transformToString()

    return JSON.parse(data) as unknown
  }

  async *readStream<T>(key: string): AsyncGenerator<T> {
    const client = this.createClient()

    const command = new GetObjectCommand({
      Bucket: this.configService.get('S3_BUCKET'),
      Key: key,
    })

    const response = await client.send(command)
    const bodyStream = response.Body as Readable

    const pipeline = chain([bodyStream, parser(), streamArray()])

    for await (const { value } of pipeline) {
      yield value as T
    }
  }
}
