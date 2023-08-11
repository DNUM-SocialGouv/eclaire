import { OrganizationModel } from './OrganizationModel'
import { AssignerForSecondaryIdentifier } from '../special-purpose-data-types/ReferenceModel'

describe('organizationModel', () => {
  describe('#createSecondaryAssigner', () => {
    it('should create a properly formatted model when ANSM assigner is given', () => {
      expect(OrganizationModel.createSecondaryAssigner(AssignerForSecondaryIdentifier.ANSM)).toMatchInlineSnapshot(`
        OrganizationModel {
          "address": undefined,
          "contact": undefined,
          "id": "ansm",
          "identifier": undefined,
          "name": "Agence nationale de sécurité du médicament et des produits de santé",
          "resourceType": "Organization",
          "telecom": [
            ContactPointModel {
              "extension": undefined,
              "system": "url",
              "use": "work",
              "value": "https://ansm.sante.fr",
            },
          ],
          "type": undefined,
        }
      `)
    })

    it('should create a properly formatted model when CTIS assigner is given', () => {
      expect(OrganizationModel.createSecondaryAssigner(AssignerForSecondaryIdentifier.CTIS)).toMatchInlineSnapshot(`
        OrganizationModel {
          "address": undefined,
          "contact": undefined,
          "id": "ctis",
          "identifier": undefined,
          "name": "Clinical Trials Information System",
          "resourceType": "Organization",
          "telecom": [
            ContactPointModel {
              "extension": undefined,
              "system": "url",
              "use": "work",
              "value": "https://euclinicaltrials.eu/",
            },
          ],
          "type": undefined,
        }
      `)
    })

    it('should create a properly formatted model when EUDRACT assigner is given', () => {
      expect(OrganizationModel.createSecondaryAssigner(AssignerForSecondaryIdentifier.EUDRACT)).toMatchInlineSnapshot(`
        OrganizationModel {
          "address": undefined,
          "contact": undefined,
          "id": "eudract",
          "identifier": undefined,
          "name": "European Union Drug Regulating Authorities Clinical Trials Database",
          "resourceType": "Organization",
          "telecom": [
            ContactPointModel {
              "extension": undefined,
              "system": "url",
              "use": "work",
              "value": "https://eudract.ema.europa.eu/",
            },
          ],
          "type": undefined,
        }
      `)
    })

    it('should create a properly formatted model when none assigner is given', () => {
      expect(OrganizationModel.createSecondaryAssigner(undefined)).toMatchInlineSnapshot(`
        OrganizationModel {
          "address": undefined,
          "contact": undefined,
          "id": undefined,
          "identifier": undefined,
          "name": undefined,
          "resourceType": "Organization",
          "telecom": [
            ContactPointModel {
              "extension": undefined,
              "system": "url",
              "use": "work",
              "value": undefined,
            },
          ],
          "type": undefined,
        }
      `)
    })
  })
})
