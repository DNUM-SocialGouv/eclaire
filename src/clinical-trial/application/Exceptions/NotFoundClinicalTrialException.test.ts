import { NotFoundClinicalTrialException } from './NotFoundClinicalTrialException'

describe('clinical trial not found', () => {
  it('should return a message', () => {
    // WHEN
    const error = new NotFoundClinicalTrialException()

    // THEN
    expect(error.message).toBe('Aucun essai clinique n’a été trouvé')
  })
})
