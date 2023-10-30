import { GetObjectCommand, GetObjectCommandInput, S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'

export class S3Service {
  constructor(
    private readonly configService: ConfigService
  ) {}

  async read(key: string): Promise<unknown> {
    const config: S3ClientConfig = {
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_KEY'),
      },
      endpoint: 'https://storage-eb4.cegedim.cloud',
      forcePathStyle: true,
      region: 'eb4',
    }
    const client = new S3Client(config)

    const input: GetObjectCommandInput = {
      Bucket: this.configService.get('S3_BUCKET'),
      Key: key,
    }
    const command = new GetObjectCommand(input)
    const response = await client.send(command)
    const data = await response.Body.transformToString()

    return JSON.parse(data) as unknown
  }
}
