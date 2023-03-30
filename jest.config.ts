import type { Config } from '@jest/types'

module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  fakeTimers: { now: 1664703388050 }, // 2022-01-01T23:00:00.135Z
  maxWorkers: 4,
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*(*.)@(test).ts',
  ],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
} satisfies Config.InitialOptions
