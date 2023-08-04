import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [swc.vite({ module: { type: 'es6' } })],
  test: {
    clearMocks: true,
    coverage: {
      skipFull: true,
      exclude: [
        'src/api/AppController.ts',
        'src/api/sentry',
        'src/api/swagger',
        'src/shared/logger',
      ],
      provider: 'istanbul'
    },
    environment: 'node',
    exclude: [...configDefaults.exclude, '.stryker-tmp/**'],
    globals: true,
    mockReset: true,
    restoreMocks: true,
    sequence: { shuffle: true },
    singleThread: true,
    snapshotFormat: {
      escapeString: false,
    }
  },
})
