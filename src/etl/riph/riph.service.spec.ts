import { Test, TestingModule } from '@nestjs/testing'

import { RiphService } from './riph.service'

describe('RiphService', () => {
  let service: RiphService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [RiphService] }).compile()

    service = module.get<RiphService>(RiphService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
