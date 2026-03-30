import { describe, it, expect, vi, beforeEach } from 'vitest'

import { ExportPageController } from './ExportPageController'

// mock module fs before import
vi.mock('fs', () => ({ existsSync: vi.fn() }))

import * as fs from 'fs'

describe('exportPageController', () => {
  let controller: ExportPageController

  beforeEach(() => {
    vi.clearAllMocks()
    controller = new ExportPageController()
  })

  it('should return 404 if file does not exist', () => {
    (fs.existsSync as any).mockReturnValue(false)

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any

    controller.servePage('token', res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith('Page not found')
  })

  it('should send file if exists', () => {
    (fs.existsSync as any).mockReturnValue(true)

    const res = { sendFile: vi.fn() } as any

    controller.servePage('token', res)

    expect(res.sendFile).toHaveBeenCalledWith()
  })

  it('should throw if token is invalid', () => {
    process.env.CRON_TOKEN = 'secret'

    const res = {} as any

    expect(() =>
      controller.servePage('wrong-token', res)).toThrow()
  })
})
