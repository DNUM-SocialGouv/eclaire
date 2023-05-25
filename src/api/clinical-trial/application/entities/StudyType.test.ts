import { StudyType } from './StudyType'

describe('study type', () => {
  it('should have a study type', () => {
    // WHEN
    const studyType = new StudyType('Human Pharmacology (Phase I) - First administration to humans', 'JARDE', '', 'Catégorie 1')

    // THEN
    expect(studyType.phase).toBe('Human Pharmacology (Phase I) - First administration to humans')
    expect(studyType.type).toBe('JARDE')
    expect(studyType.design).toBe('')
    expect(studyType.category).toBe('Catégorie 1')
  })
})
