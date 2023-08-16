import { expect } from 'vitest'

import { CodeableConceptModel } from './CodeableConceptModel'

describe('shared | models | fhir | CodeableConceptModel', () => {
  describe('#createMedDraCondition', () => {
    it('should create a properly formatted model with research study phase when one code is given', () => {
      expect(CodeableConceptModel.createMedDraCondition('10018938')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "10018938",
              "display": "MedDRA",
              "system": "http://terminology.hl7.org/CodeSystem/mdr",
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
              "system": "http://terminology.hl7.org/CodeSystem/mdr",
              "version": "2.0.1",
            },
            CodingModel {
              "code": "10018937",
              "display": "MedDRA",
              "system": "http://terminology.hl7.org/CodeSystem/mdr",
              "version": "2.0.1",
            },
            CodingModel {
              "code": "10018939",
              "display": "MedDRA",
              "system": "http://terminology.hl7.org/CodeSystem/mdr",
              "version": "2.0.1",
            },
          ],
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
              "system": "http://hl7.org/fhir/administrative-gender",
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
              "system": "http://hl7.org/fhir/administrative-gender",
              "version": "5.0.0",
            },
            CodingModel {
              "code": "female",
              "display": "Female",
              "system": "http://hl7.org/fhir/administrative-gender",
              "version": "5.0.0",
            },
          ],
          "text": "Genders",
        }
      `)
    })
  })

  describe('#createStudyPopulation', () => {
    it('should create a properly formatted model with related coding when one study population is given', () => {
      expect(CodeableConceptModel.createStudyPopulation('Women of child bearing potential using contraception')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": undefined,
              "display": "Femmes en âge de procréer utilisant une méthode de contraception",
              "system": undefined,
              "version": undefined,
            },
          ],
          "text": "Study Population",
        }
      `)
    })

    it('should create a properly formatted model with related coding when multiple study population is given', () => {
      expect(CodeableConceptModel.createStudyPopulation('Women of child bearing potential using contraception, Minors')).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": undefined,
              "display": "Femmes en âge de procréer utilisant une méthode de contraception",
              "system": undefined,
              "version": undefined,
            },
            CodingModel {
              "code": undefined,
              "display": "Mineurs",
              "system": undefined,
              "version": undefined,
            },
          ],
          "text": "Study Population",
        }
      `)
    })
  })
})
