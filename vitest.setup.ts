import { vi } from 'vitest'

// pour éviter de changer les jest en vi mais il faudra le faire à terme quand strykerjs aura un runner pour vitest
// @ts-ignore
globalThis.jest = vi
