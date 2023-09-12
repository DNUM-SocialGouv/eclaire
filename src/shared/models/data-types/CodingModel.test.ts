import { CodingModel } from './CodingModel'

describe('shared | models | CodingModel', () => {
  describe('#createResearchStudyPhase', () => {
    it.each([
      ['Phase I', 'phase-1', 'Phase 1'],
      ['Phase I/Phase II', 'phase-1-phase-2', 'Phase 1/Phase 2'],
      ['Phase II', 'phase-2', 'Phase 2'],
      ['Phase II/Phase III', 'phase-2-phase-3', 'Phase 2/Phase 3'],
      ['Phase III', 'phase-3', 'Phase 3'],
      ['Phase III/Phase IV', 'phase-3-phase-4', 'Phase III and phase IV (Integrated)'],
      ['Phase IV', 'phase-4', 'Phase 4'],
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
