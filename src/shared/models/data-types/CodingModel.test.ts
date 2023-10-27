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
    ])('should create a properly formatted model when %s is given', (rawPhase, code, display) => {
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
    ])('should create a properly formatted model when %s is given', (rawGender, code) => {
      // WHEN
      const gender = CodingModel.createGender(rawGender)

      // THEN
      expect(gender.code).toBe(code)
      expect(gender.display).toBe(rawGender)
    })
  })

  describe('#createReglementationPrecision', () => {
    it.each([
      ['IC-Cas 1', 'IC-Cas-1', 'IC-Cas 1 (DM)'],
      ['IC-Cas 2', 'IC-Cas-2', 'IC-Cas 2 (DM)'],
      ['IC-Cas 3', 'IC-Cas-3', 'IC-Cas 3 (DM)'],
      ['IC-Cas 4.1', 'IC-Cas-4-1', 'IC-Cas 4.1 (DM)'],
      ['IC-Cas 4.2', 'IC-Cas-4-2', 'IC-Cas 4.2 (DM)'],
      ['IC-Cas 4.3', 'IC-Cas-4-3', 'IC-Cas 4.3 (DM)'],
      ['IC-Cas 4.4', 'IC-Cas-4-4', 'IC-Cas 4.4 (DM)'],
      ['EP-Cas 1', 'EP-Cas-1', 'EP-Cas 1 (DM)'],
      ['EP-Cas 2', 'EP-Cas-2', 'EP-Cas 2 (DM)'],
      ['EP-Cas 3', 'EP-Cas-3', 'EP-Cas 3 (DM)'],
      ['Catégorie 1', 'cat1-jarde', 'Catégorie 1 (JARDE)'],
      ['Catégorie 2', 'cat2-jarde', 'Catégorie 2 (JARDE)'],
      ['Catégorie 3', 'cat3-jarde', 'Catégorie 3 (JARDE)'],
      ['Catégorie 3 questionnaire', 'cat3-questionnaire-jarde', 'Catégorie 3 questionnaire (JARDE)'],
      ['Dérogation à l’obligation d’information', 'derog-obligation-info-jarde', 'Dérogation à l’obligation d’information (JARDE)'],
      ['un essai clinique (CTIS)', 'study-ctis', 'un essai clinique (CTIS)'],
      ['un essai clinique à faible intervention (CTIS)', 'study-low-inter-ctis', 'un essai clinique à faible intervention (CTIS)'],
    ])('should create a properly formatted model when %s is given', (rawPrecision, code, display) => {
      // WHEN
      const reglementationPrecision = CodingModel.createReglementationPrecision(rawPrecision)

      // THEN
      expect(reglementationPrecision.code).toBe(code)
      expect(reglementationPrecision.display).toBe(display)
    })
  })

  describe('#createRegulationCode', () => {
    it.each([
      ['REG536', 'REG536 (CTIS)'],
      ['REG745', 'REG745 (DM)'],
      ['REG746', 'REG746 (DM-DIV)'],
      ['JARDE', 'JARDE (Jarde)'],
    ])('should create a properly formatted model when %s is given', (rawRegulation, display) => {
      // WHEN
      const regulationCode = CodingModel.createRegulationCode(rawRegulation)

      // THEN
      expect(regulationCode.code).toBe(rawRegulation)
      expect(regulationCode.display).toBe(display)
    })
  })

  describe('#createStudyPopulation', () => {
    it.each([
      ['Incapacitated population (Population en situation de handicap)', 'incap-pop'],
      ['Minors (Mineurs)', 'minors'],
      ['Nursing women (Femmes allaitant)', 'nursing'],
      ['Other (Autres)', 'other'],
      ['Pregnant women (Femmes enceintes)', 'pregnant'],
      ["Subjects in emergency situation (Sujets en situation d'urgence)", 'emergency-situation'],
      ['Subjects incapable of giving consent personally (Sujets incapables de donner leur consentement personnel)', 'incap-consent'],
      ["Women of child bearing potential not using contraception (Femmes en âge de procréer n'utilisant pas de contraception)", 'no-using-contraception'],
      ['Women of child bearing potential using contraception (Femmes en âge de procréer utilisant une méthode de contraception)', 'using-contraception'],
    ])('should create a properly formatted model when %s is given', (rawStudyPopulation, code) => {
      // WHEN
      const studyPopulation = CodingModel.createStudyPopulation(rawStudyPopulation)

      // THEN
      expect(studyPopulation.code).toBe(code)
      expect(studyPopulation.display).toBe(rawStudyPopulation)
    })
  })
})
