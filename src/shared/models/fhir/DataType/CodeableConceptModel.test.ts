import { expect } from 'vitest'

import { CodeableConceptModel } from './CodeableConceptModel'

describe('shared | models | fhir | CodeableConceptModel', () => {
  describe('#createResearchStudyPhase', () => {
    it('should create a properly formatted model with research study phase when information is given', () => {
      expect(CodeableConceptModel.createResearchStudyPhase('Phase I')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "phase-1",
              "display": "Phase 1",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "userSelected": undefined,
              "version": "4.0.1",
            },
          ],
          "text": "Research Study Phase",
        }
      `)
    })

    it('should create a properly formatted model with research study phase when information is empty', () => {
      expect(CodeableConceptModel.createResearchStudyPhase('')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "n-a",
              "display": "N/A",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "userSelected": undefined,
              "version": "4.0.1",
            },
          ],
          "text": "Research Study Phase",
        }
      `)
    })
  })

  describe('#createCategory', () => {
    it('should create a properly formatted model with category when information is given', () => {
      // given
      const regulationCode = 'REG536'

      // when
      const result = CodeableConceptModel.createCategory(regulationCode)

      // then
      expect(result).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": undefined,
              "display": "REG536",
              "id": undefined,
              "system": undefined,
              "userSelected": undefined,
              "version": undefined,
            },
          ],
          "text": "Regulation Code",
        }
      `)
    })
  })

  describe('#createDiseaseCondition', () => {
    it('should create a properly formatted model with research study phase when information is given', () => {
      expect(CodeableConceptModel.createDiseaseCondition('Locally-Advanced or Metastatic breast cancer (MBC)')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": undefined,
              "display": "Locally-Advanced or Metastatic breast cancer (MBC)",
              "id": undefined,
              "system": undefined,
              "userSelected": undefined,
              "version": undefined,
            },
          ],
          "text": "Disease Condition",
        }
      `)
    })

    it('should create a properly formatted model with research study phase when information is empty', () => {
      expect(CodeableConceptModel.createDiseaseCondition('')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": undefined,
              "display": "",
              "id": undefined,
              "system": undefined,
              "userSelected": undefined,
              "version": undefined,
            },
          ],
          "text": "Disease Condition",
        }
      `)
    })
  })

  describe('#createMedDraCondition', () => {
    it('should create a properly formatted model with research study phase when one code is given', () => {
      expect(CodeableConceptModel.createMedDraCondition('10018938')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "10018938",
              "display": "MedDRA",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/mdr",
              "userSelected": undefined,
              "version": "2.0.1",
            },
          ],
          "text": "MedDRA Condition",
        }
      `)
    })

    it('should create a properly formatted model with research study phase when multiple codes are given', () => {
      expect(CodeableConceptModel.createMedDraCondition('10018938, 10018937, 10018939')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "10018938",
              "display": "MedDRA",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/mdr",
              "userSelected": undefined,
              "version": "2.0.1",
            },
            CodingModel {
              "code": "10018937",
              "display": "MedDRA",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/mdr",
              "userSelected": undefined,
              "version": "2.0.1",
            },
            CodingModel {
              "code": "10018939",
              "display": "MedDRA",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/mdr",
              "userSelected": undefined,
              "version": "2.0.1",
            },
          ],
          "text": "MedDRA Condition",
        }
      `)
    })

    it('should create a properly formatted model with research study phase when information is not given', () => {
      expect(CodeableConceptModel.createMedDraCondition('')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [],
          "text": "MedDRA Condition",
        }
      `)
    })
  })

  describe('#createGenders', () => {
    it('should create a properly formatted model with related coding when one gender is given', () => {
      expect(CodeableConceptModel.createGenders('Female')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "female",
              "display": "Female",
              "id": undefined,
              "system": "http://hl7.org/fhir/administrative-gender",
              "userSelected": undefined,
              "version": "5.0.0",
            },
          ],
          "text": "Genders",
        }
      `)
    })

    it('should create a properly formatted model with related coding when multiple gender is given', () => {
      expect(CodeableConceptModel.createGenders('Male,Female')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "male",
              "display": "Male",
              "id": undefined,
              "system": "http://hl7.org/fhir/administrative-gender",
              "userSelected": undefined,
              "version": "5.0.0",
            },
            CodingModel {
              "code": "female",
              "display": "Female",
              "id": undefined,
              "system": "http://hl7.org/fhir/administrative-gender",
              "userSelected": undefined,
              "version": "5.0.0",
            },
          ],
          "text": "Genders",
        }
      `)
    })

    it('should create a properly formatted model with related coding when no gender is given', () => {
      expect(CodeableConceptModel.createGenders('')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "unknown",
              "display": "Unknown",
              "id": undefined,
              "system": "http://hl7.org/fhir/administrative-gender",
              "userSelected": undefined,
              "version": "5.0.0",
            },
          ],
          "text": "Genders",
        }
      `)
    })
  })
})
