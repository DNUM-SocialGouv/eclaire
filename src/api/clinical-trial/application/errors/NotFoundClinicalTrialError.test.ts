import { NotFoundClinicalTrialError } from './NotFoundClinicalTrialError'

describe('clinical trial not found', () => {
  it('should return a message', () => {
    // WHEN
    const error = new NotFoundClinicalTrialError()

    // THEN
    expect(error.message).toBe('Aucun essai clinique n’a été trouvé')
  })
})
