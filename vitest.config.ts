import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      exclude: ['.stryker-tmp/**'],
      provider: 'istanbul',
    },
    environment: 'node',
    globals: true,
    mockReset: true,
    outputDiffLines: 150,
    outputDiffMaxLines: 150,
    restoreMocks: true,
    sequence: { shuffle: true },
    setupFiles: ['vitest.setup.ts'],
  },
})
