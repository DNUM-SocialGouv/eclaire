import { Title } from './Title'

describe('title', () => {
  it('should have a title', () => {
    // WHEN
    const title = new Title('AGADIR', 'Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée')

    // THEN
    expect(title.acronym).toBe('AGADIR')
    expect(title.value).toBe('Circuler l’ADN pour améliorer le résultat de l’oncologie Patient. Une étude randomisée')
  })
})
