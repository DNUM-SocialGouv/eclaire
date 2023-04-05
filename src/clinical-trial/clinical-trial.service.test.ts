import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { ClinicalTrialService } from './clinical-trial.service'
import { ClinicalTrial } from './model/ClinicalTrial'
import { Title } from './model/Title'

describe('clinicalTrialService', () => {
  let service: ClinicalTrialService

  beforeEach(async () => {
    const data = [
      {
        public_title: {
          acronym: 'RSC',
          value: 'Resist, scotty, core!',
        },
        scientific_title: {
          acronym: 'RSC',
          value: 'Try draining rhubarb fritters flavored with bourbon.',
        },
        uuid: '123',
      },
    ]

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ClinicalTrialService,
          useFactory: () => {
            return new ClinicalTrialService(data)
          },
        },
      ],
    }).compile()

    service = module.get<ClinicalTrialService>(ClinicalTrialService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should find one clinical trial', () => {
    const expected: ClinicalTrial = new ClinicalTrial({
      public_title: {
        acronym: 'RSC',
        value: 'Resist, scotty, core!',
      } as Title,
      scientific_title: {
        acronym: 'RSC',
        value: 'Try draining rhubarb fritters flavored with bourbon.',
      } as Title,
      uuid: '123',
    })

    expect(service.findOne('123')).toStrictEqual(expected)
  })

  it('should find return a 404 error if no trial exist', () => {
    try {
      service.findOne('9')
      throw new Error('Should not be triggered')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  })
})
