import { Criteria } from './Criteria'

describe('criteria', () => {
  it('should have a criteria', () => {
    // WHEN
    const criteria = new Criteria('1', 'femme porteuse d’un cancer du sein stade terminal', 'women with breast cancer terminal phase')

    // THEN
    expect(criteria.id).toBe('1')
    expect(criteria.value).toBe('femme porteuse d’un cancer du sein stade terminal')
    expect(criteria.value_language).toBe('women with breast cancer terminal phase')
  })
})
