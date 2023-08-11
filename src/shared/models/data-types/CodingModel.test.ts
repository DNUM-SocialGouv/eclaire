import { CodingModel } from './CodingModel'

describe('shared | models | fhir | CodingModel', () => {
  describe('#createResearchStudyPhase', () => {
    it('should create a properly formatted model with phase when phase 1 is given', () => {
      expect(CodingModel.createResearchStudyPhase('Human Pharmacology (Phase I)')).toMatchInlineSnapshot(`
        CodingModel {
          "code": "phase-1",
          "display": "Phase 1",
          "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
          "version": "4.0.1",
        }
      `)
    })

    it('should create a properly formatted model with phase when phase 2 is given', () => {
      expect(CodingModel.createResearchStudyPhase('Therapeutic exploratory (Phase II)')).toMatchInlineSnapshot(`
        CodingModel {
          "code": "phase-2",
          "display": "Phase 2",
          "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
          "version": "4.0.1",
        }
      `)
    })

    it('should create a properly formatted model with phase 3 when phase is given', () => {
      expect(CodingModel.createResearchStudyPhase('Therapeutic confirmatory (Phase III)')).toMatchInlineSnapshot(`
        CodingModel {
          "code": "phase-3",
          "display": "Phase 3",
          "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
          "version": "4.0.1",
        }
      `)
    })

    it('should create a properly formatted model with phase when phase 4 is given', () => {
      expect(CodingModel.createResearchStudyPhase('Therapeutic use (Phase IV)')).toMatchInlineSnapshot(`
        CodingModel {
          "code": "phase-4",
          "display": "Phase 4",
          "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
          "version": "4.0.1",
        }
      `)
    })

    it('should create a properly formatted model without phase when phase is not given', () => {
      expect(CodingModel.createResearchStudyPhase('')).toMatchInlineSnapshot(`
        CodingModel {
          "code": "n-a",
          "display": "N/A",
          "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
          "version": "4.0.1",
        }
      `)
    })
  })

  describe('#createGender', () => {
    it('should create a properly formatted model with gender when information is given', () => {
      expect(CodingModel.createGender('Female')).toMatchInlineSnapshot(`
        CodingModel {
          "code": "female",
          "display": "Female",
          "system": "http://hl7.org/fhir/administrative-gender",
          "version": "5.0.0",
        }
      `)
    })

    it('should create a properly formatted model without gender when information is not given', () => {
      expect(CodingModel.createGender('unknown')).toMatchInlineSnapshot(`
        CodingModel {
          "code": "unknown",
          "display": "Unknown",
          "system": "http://hl7.org/fhir/administrative-gender",
          "version": "5.0.0",
        }
      `)
    })
  })
})
