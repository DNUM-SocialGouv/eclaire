import { ClientOptions } from '@elastic/elasticsearch'
import { hostname } from 'os'

const defaultConfig: Partial<ClientOptions> = {
  compression: 'gzip',
  // generateRequestId: () => crypto.randomUUID(),
  maxRetries: 5,
  // auth: { apiKey: 'base64EncodedKey' }, // define security spec. Disable for poc testing (apiKey // ssl cacert.pem),
  opaqueIdPrefix: `${hostname()}-`,
  requestTimeout: 60000,
  node: process.env.SCALINGO_ELASTICSEARCH_URL,
}

export const eSClientConfigLocal: Partial<ClientOptions> = { ...defaultConfig }

export const eSClientConfigProduction: Partial<ClientOptions> = { ...defaultConfig }
