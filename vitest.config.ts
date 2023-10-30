import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [swc.vite({ module: { type: 'es6' } })],
  test: {
    coverage: {
      exclude: [
        'src/api/AppController.ts',
        'src/api/sentry',
        'src/api/swagger',
        'src/shared/logger',
        'src/shared/test',
      ],
      provider: 'istanbul',
      skipFull: true,
    },
    environment: 'node',
    exclude: [...configDefaults.exclude, '.stryker-tmp/**'],
    globals: true,
    restoreMocks: true,
    sequence: { shuffle: true },
    singleThread: true,
    snapshotFormat: { escapeString: false },
    unstubEnvs: true,
  },
})
