import { ClinicalTrialResponse } from './clinical-trial.response'
import { ClinicalTrial } from '../model/ClinicalTrial'

describe('clinicalTrialResponse', () => {
  it('should return a valid response', () => {
    const clinicalTrial = new ClinicalTrial({
      public_title: {
        acronym: 'RSC',
        value: 'Resist, scotty, core!',
      },
      scientific_title: {
        acronym: 'RSC',
        value: 'Try draining rhubarb fritters flavored with bourbon.',
      },
      uuid: '123',
    })
    const response = new ClinicalTrialResponse(clinicalTrial)
    expect(response.getResponse()).toStrictEqual({
      public_title: {
        acronym: 'RSC',
        value: 'Resist, scotty, core!',
      },
      scientific_title: {
        acronym: 'RSC',
        value: 'Try draining rhubarb fritters flavored with bourbon.',
      },
    })
  })
})
