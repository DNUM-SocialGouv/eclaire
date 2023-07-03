import { CodeableConceptModel } from './CodeableConceptModel'

describe('shared | models | fhir | CodeableConceptModel', () => {
  describe('#createCategory', () => {
    it('should create a properly formatted model with category when information is given', () => {
      // given
      const reglementationCode = 'REG536'

      // when
      const result = CodeableConceptModel.createCategory(reglementationCode)

      // then
      expect(result).toMatchInlineSnapshot(`
        CodeableConceptModel {
          "coding": [
            undefined,
          ],
          "id": undefined,
          "text": "REG536",
        }
      `)
    })
  })
})
