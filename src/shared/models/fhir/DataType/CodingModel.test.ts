import { CodingModel } from './CodingModel'

describe('shared | models | fhir | CodingModel', () => {
  describe('#createResearchStudyPhase', () => {
    it('should create a properly formatted model with phase when phase is given', () => {
      // given
      const rawPhase = 'Therapeutic confirmatory  (Phase III)'
      // when
      const result = CodingModel.createResearchStudyPhase(rawPhase)
      // then
      expect(result).toMatchInlineSnapshot(`
        CodingModel {
          "code": "phase-3",
          "display": "Phase 3",
          "id": undefined,
          "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
          "userSelected": undefined,
          "version": "4.0.1",
        }
      `)
    })

    it('should create a properly formatted model without phase when phase is not given', () => {
      // when
      const result = CodingModel.createResearchStudyPhase('')
      // then
      expect(result).toMatchInlineSnapshot(`
        CodingModel {
          "code": "n-a",
          "display": "N/A",
          "id": undefined,
          "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
          "userSelected": undefined,
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
          "id": undefined,
          "system": "http://hl7.org/fhir/administrative-gender",
          "userSelected": undefined,
          "version": "5.0.0",
        }
      `)
    })
    it('should create a properly formatted model without gender when information is not given', () => {
      expect(CodingModel.createGender('unknown')).toMatchInlineSnapshot(`
        CodingModel {
          "code": "unknown",
          "display": "Unknown",
          "id": undefined,
          "system": "http://hl7.org/fhir/administrative-gender",
          "userSelected": undefined,
          "version": "5.0.0",
        }
      `)
    })
  })
})
