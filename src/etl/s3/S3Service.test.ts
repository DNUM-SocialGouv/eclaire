import { GetObjectCommand, GetObjectCommandInput, S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'

import { S3Service } from './S3Service'

vi.mock('@aws-sdk/client-s3')

describe('s3 service', () => {
  it('should read the S3 API', async () => {
    // GIVEN
    const key = 'fake_key'
    process.env.S3_ACCESS_KEY = 'fake_access_key'
    process.env.S3_SECRET_KEY = 'fake_secret_key'
    process.env.S3_BUCKET = 'fake_bucket'
    const configService = new ConfigService()
    const s3Service = new S3Service(configService)
    // @ts-ignore
    vi.spyOn(S3Client.prototype, 'send').mockResolvedValueOnce({
      Body: {
        transformToString: (): string => {
          return '[{"d":"data_string"}]'
        },
      },
    })

    // WHEN
    const result = await s3Service.read(key)

    // THEN
    const config: S3ClientConfig = {
      credentials: {
        accessKeyId: 'fake_access_key',
        secretAccessKey: 'fake_secret_key',
      },
      endpoint: 'https://storage-eb4.cegedim.cloud',
      forcePathStyle: true,
      region: 'eb4',
    }
    expect(S3Client).toHaveBeenCalledWith(config)
    const input: GetObjectCommandInput = {
      Bucket: 'fake_bucket',
      Key: key,
    }
    expect(GetObjectCommand).toHaveBeenCalledWith(input)
    expect(result).toStrictEqual([{ d: 'data_string' }])
  })
})
