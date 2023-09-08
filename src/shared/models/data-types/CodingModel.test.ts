import { CodingModel } from './CodingModel'

describe('shared | models | CodingModel', () => {
  describe('#createResearchStudyPhase', () => {
    it.each([
      ['Human Pharmacology (Phase I)', 'phase-1', 'Phase 1'],
      ['Therapeutic exploratory (Phase II)', 'phase-2', 'Phase 2'],
      ['Therapeutic confirmatory (Phase III)', 'phase-3', 'Phase 3'],
      ['Therapeutic use (Phase IV)', 'phase-4', 'Phase 4'],
      [null, 'n-a', 'N/A'],
    ])('should create a properly formatted model with phase when %s is given', (rawPhase, code, display) => {
      // WHEN
      const phase = CodingModel.createResearchStudyPhase(rawPhase)

      // THEN
      expect(phase.code).toBe(code)
      expect(phase.display).toBe(display)
    })
  })

  describe('#createGender', () => {
    it.each([
      ['Female', 'female'],
      ['Male', 'male'],
      ['Unknown', 'unknown'],
    ])('should create a properly formatted model with %s when information is given', (rawGender, code) => {
      // WHEN
      const gender = CodingModel.createGender(rawGender)

      // THEN
      expect(gender.code).toBe(code)
      expect(gender.display).toBe(rawGender)
    })
  })

  describe('#createReglementationPrecision', () => {
    it.each([
      ['No', 'un essai clinique'],
      ['Yes', 'un essai clinique à faible intervention'],
    ])('should create a properly formatted model when %s is given', (rawPrecision, display) => {
      // WHEN
      const reglementationPrecision = CodingModel.createReglementationPrecision(rawPrecision)

      // THEN
      expect(reglementationPrecision.display).toBe(display)
    })
  })
})
