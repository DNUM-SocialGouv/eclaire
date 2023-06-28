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
          "system": "https://terminology.hl7.org/CodeSystem/research-study-phase",
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
          "system": "https://terminology.hl7.org/CodeSystem/research-study-phase",
          "userSelected": undefined,
          "version": "4.0.1",
        }
      `)
    })
  })
})
