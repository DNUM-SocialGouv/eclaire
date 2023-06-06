// eslint-disable-next-line import/no-unresolved
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: { provider: 'istanbul' },
    environment: 'node',
    exclude: [...configDefaults.exclude, '.stryker-tmp/**'],
    globals: true,
    mockReset: true,
    outputDiffLines: 150,
    outputDiffMaxLines: 150,
    restoreMocks: true,
    sequence: { shuffle: true },
    setupFiles: ['vitest.setup.ts'],
    singleThread: true,
  },
})
