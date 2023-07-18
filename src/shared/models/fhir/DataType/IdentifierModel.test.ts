/* eslint-disable sort-keys */
import { expect } from 'vitest'

import { IdentifierModel } from './IdentifierModel'

describe('shared | models | fhir | IdentifierModel', () => {
  describe('#createSecondarySlice', () => {
    [
      { number: '123', regulationCode: 'REG536', qualification: undefined, assigner: 'euclinicaltrials.eu' },
      { number: '123', regulationCode: 'REG745', qualification: undefined, assigner: 'Agence nationale de sécurité du médicament et des produits de santé (ANSM)' },
      { number: '123', regulationCode: 'REG746', qualification: undefined, assigner: 'Agence nationale de sécurité du médicament et des produits de santé (ANSM)' },
      { number: '123', regulationCode: 'JARDE', qualification: 'Catégorie 1', assigner: 'European Union Drug Regulating Authorities Clinical Trials Database (Eudra CT)' },
      { number: '123', regulationCode: 'JARDE', qualification: 'Catégorie 2', assigner: 'Agence nationale de sécurité du médicament et des produits de santé (ANSM)' },
      { number: '123', regulationCode: 'JARDE', qualification: 'Catégorie 3', assigner: 'Agence nationale de sécurité du médicament et des produits de santé (ANSM)' },
    ].forEach((data) => {
      it(`should create an identifier assigned by ${data.assigner}`, () => {
        // when
        const result = IdentifierModel.createSecondarySlice(data.number, data.regulationCode, data.qualification)

        // then
        expect(result.assigner.display).toBe(data.assigner)
      })
    })

    it('should create an identifier without assigner when there is no regulation code', () => {
      // when
      const result = IdentifierModel.createSecondarySlice('123', undefined, undefined)

      // then
      expect(result.assigner).toBeUndefined()
    })
  })
})
