import { NotFoundClinicalTrialError } from './NotFoundClinicalTrialError'

describe('clinical trial not found', () => {
  it('should return a message', () => {
    // WHEN
    const error = new NotFoundClinicalTrialError('2022-500014-26-00')

    // THEN
    expect(error.message).toBe('L’essai clinique 2022-500014-26-00 n’a pas été trouvé')
  })
})
