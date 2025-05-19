import { OrganizationModel } from './OrganizationModel'
import { AssignerForPrimaryIdentifier } from '../special-purpose-data-types/ReferenceModel'

describe('shared | models | OrganizationModel', () => {
  describe('#createPrimaryAssigner', () => {
    it('should create a properly formatted model when ANSM assigner is given', () => {
      // WHEN
      const organization = OrganizationModel.createPrimaryAssigner(AssignerForPrimaryIdentifier.ANSM)

      // THEN
      expect(organization.id).toBe('ansm')
      expect(organization.name).toBe('Agence nationale de sécurité du médicament et des produits de santé')
      expect(organization.telecom[0].value).toBe('https://ansm.sante.fr')
    })

    it('should create a properly formatted model when CTIS assigner is given', () => {
      // WHEN
      const organization = OrganizationModel.createPrimaryAssigner(AssignerForPrimaryIdentifier.CTIS)

      // THEN
      expect(organization.id).toBe('ctis')
      expect(organization.name).toBe('Clinical Trials Information System')
      expect(organization.telecom[0].value).toBe('https://euclinicaltrials.eu/')
    })

    it('should create a properly formatted model when EUDRACT assigner is given', () => {
      // WHEN
      const organization = OrganizationModel.createPrimaryAssigner(AssignerForPrimaryIdentifier.EUDRACT)

      // THEN
      expect(organization.id).toBe('eudract')
      expect(organization.name).toBe('European Union Drug Regulating Authorities Clinical Trials Database')
      expect(organization.telecom[0].value).toBe('https://eudract.ema.europa.eu/')
    })
  })
})
