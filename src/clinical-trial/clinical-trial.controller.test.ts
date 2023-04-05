import { Test, TestingModule } from '@nestjs/testing'

import { ClinicalTrialController } from './clinical-trial.controller'

describe('clinicalTrialController', () => {
  let controller: ClinicalTrialController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ controllers: [ClinicalTrialController] }).compile()

    controller = module.get<ClinicalTrialController>(ClinicalTrialController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
