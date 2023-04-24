import { ClientOptions } from '@elastic/elasticsearch'
import { hostname } from 'os'

const defaultConfig: Partial<ClientOptions> = {
  compression: 'gzip',
  // generateRequestId: () => crypto.randomUUID(),
  maxRetries: 5,
  // auth: { apiKey: 'base64EncodedKey' }, // define security spec. Disable for poc testing (apiKey // ssl cacert.pem),
  opaqueIdPrefix: `${hostname()}-`,
  requestTimeout: 60000,
}

export const eSClientConfigLocal: Partial<ClientOptions> = { node: 'http://localhost:9200', ...defaultConfig }

export const eSClientConfigProduction: Partial<ClientOptions> = {
  ...defaultConfig,
  nodes: [
    'http://192.168.100.2:9200',
    'http://192.168.100.3:9200',
    'http://192.168.100.4:9200',
    'http://192.168.100.5:9200',
    'http://192.168.100.6:9200',
  ],
}
