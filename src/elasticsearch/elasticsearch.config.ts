import { hostname } from 'os'

const defaultConfig = (elasticsearchUrl: string) => {
  return {
    compression: 'gzip',
    // generateRequestId: () => crypto.randomUUID(),
    maxRetries: 5,
    // auth: { apiKey: 'base64EncodedKey' }, // define security spec. Disable for poc testing (apiKey // ssl cacert.pem),
    node: elasticsearchUrl,
    opaqueIdPrefix: `${hostname()}-`,
    requestTimeout: 60000,
  }
}

export const eSClientConfigLocal = (elasticsearchUrl: string): object => {
  const config = defaultConfig(elasticsearchUrl)
  return { ...config }
}

export const eSClientConfigProduction = (elasticsearchUrl: string) => {
  const config = defaultConfig(elasticsearchUrl)
  return { ...config }
}
