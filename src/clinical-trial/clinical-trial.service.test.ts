import { Test, TestingModule } from '@nestjs/testing'

import { ClinicalTrialService } from './clinical-trial.service'

describe('clinicalTrialService', () => {
  let service: ClinicalTrialService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [ClinicalTrialService] }).compile()

    service = module.get<ClinicalTrialService>(ClinicalTrialService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
