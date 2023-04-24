import { TherapeuticArea } from './TherapeuticArea'

describe('therapeutic area', () => {
  it('should have a therapeutic area', () => {
    // WHEN
    const therapeuticArea = new TherapeuticArea('The sinner views milk which is not apostolic.', 'Z01')

    // THEN
    expect(therapeuticArea.value).toBe('The sinner views milk which is not apostolic.')
    expect(therapeuticArea.code).toBe('Z01')
  })
})
