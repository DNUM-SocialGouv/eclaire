import { NarrativeModel } from './NarrativeModel'
import { OrganizationModel } from './OrganizationModel'
import { AssignerForPrimaryIdentifier } from '../special-purpose-data-types/ReferenceModel'

describe('shared | models | OrganizationModel', () => {
  describe('#createPrimaryAssigner', () => {
    it('should create a properly formatted model when ANSM assigner is given', () => {
      const text:NarrativeModel = {
        div: '<div xmlns="http://www.w3.org/1999/xhtml"><h2>Données reçues avant modélisation FHIR</h2><ul><li> reglementation_code: JARDE </li><li> precision_reglementation: Catégorie 1 </li><li> etat: EXPIREE </li><li> organisme_nom: DGS </li><li> organisme_adresse: fcdscdqc </li><li> organisme_code_postal: 75000 </li><li> organisme_pays: France </li><li> organisme_ville: Paris </li><li> contact_nom: Achy </li><li> contact_prenom: Katherine </li><li> contact_telephone: null </li><li> contact_courriel: kay.2812testriph@gmail.com </li><li> sites: Organisme: null - Adresse: null - Ville: null - Titre: null - Nom: null - Prenom: null - Service: null </li><li> numero_primaire: 0000-000000-00 </li><li> titre: vdvdsv </li><li> phase_recherche: N/A </li><li> domaine_therapeutique: Hématologie </li><li> pathologies_maladies_rares: null </li><li> informations_meddra: undefined </li><li> taille_etude: 100 </li><li> tranches_age: undefined </li><li> sexe: unknown </li><li> groupes_sujet: null </li><li> population_recrutement:  </li><li> date_debut_recrutement: null </li><li> historique: 2023-05-19:Expirée </li><li> dates_avis_favorable_ms_mns: null </li><li> pays_concernes: undefined </li><li> date_theorique_maximale_autorisation_cpp: 2021-09-04 </li><li> contact_public: Nom: null - Prenom: null Courriel: null Tel: null </li><li> criteres_eligibilite: Titre: null - Type: null </li><li> criteres_jugement: Titre: null - Type: null </li><li> objectifs: null </li><li> resume: null </li><li> statut_recrutement: Recrutement en attente </li><li> date_fin_recrutement: null </li></ul></div>',
        status: 'extensions',
      }
      // WHEN
      const organization = OrganizationModel.createPrimaryAssigner(AssignerForPrimaryIdentifier.ANSM, text)

      // THEN
      expect(organization.id).toBe('ansm')
      expect(organization.name).toBe('Agence nationale de sécurité du médicament et des produits de santé')
      expect(organization.telecom[0].value).toBe('https://ansm.sante.fr')
    })

    it('should create a properly formatted model when CTIS assigner is given', () => {
      const text:NarrativeModel = {
        div: '<div xmlns="http://www.w3.org/1999/xhtml"><h2>Données reçues avant modélisation FHIR</h2><ul><li> reglementation_code: REG536 </li><li> precision_reglementation: null </li><li> etat: A_DEMARRER </li><li> organisme_nom: Achilles Therapeutics Limited </li><li> organisme_adresse: Bioscience Catalyst </li><li> organisme_code_postal: SG1 2FX </li><li> organisme_pays: United Kingdom </li><li> organisme_ville:  </li><li> contact_nom: test </li><li> contact_prenom: Walter </li><li> contact_telephone: 0168496726 </li><li> contact_courriel: saul.goodman@achilles.eu </li><li> sites: Organisme: null - Adresse: null - Ville: null - Titre: null - Nom: null - Prenom: null - Service: null </li><li> numero_primaire: 2025-500099-39-00 </li><li> titre: null </li><li> phase_recherche: N/A </li><li> domaine_therapeutique: null </li><li> pathologies_maladies_rares: null </li><li> informations_meddra: undefined </li><li> taille_etude: null </li><li> tranches_age: undefined </li><li> sexe: unknown </li><li> groupes_sujet: null </li><li> population_recrutement: undefined </li><li> date_debut_recrutement: null </li><li> historique: 2025-05-27:À démarrer </li><li> dates_avis_favorable_ms_mns: null </li><li> pays_concernes: EE,FR </li><li> date_theorique_maximale_autorisation_cpp: 2023-03-15 </li><li> contact_public: Nom: - - Prenom: - Courriel: test12@test.com Tel: 34534525 </li><li> criteres_eligibilite: Titre: null - Type: null </li><li> criteres_jugement: Titre: null - Type: null </li><li> objectifs: null </li><li> resume: null </li><li> statut_recrutement: Recrutement en attente </li><li> date_fin_recrutement: null </li></ul></div>',
        status: 'extensions',
      }
      // WHEN
      const organization = OrganizationModel.createPrimaryAssigner(AssignerForPrimaryIdentifier.CTIS, text)

      // THEN
      expect(organization.id).toBe('ctis')
      expect(organization.name).toBe('Clinical Trials Information System')
      expect(organization.telecom[0].value).toBe('https://euclinicaltrials.eu/')
    })

    it('should create a properly formatted model when EUDRACT assigner is given', () => {
      // WHEN
      const organization = OrganizationModel.createPrimaryAssigner(AssignerForPrimaryIdentifier.EUDRACT, undefined)

      // THEN
      expect(organization.id).toBe('eudract')
      expect(organization.name).toBe('European Union Drug Regulating Authorities Clinical Trials Database')
      expect(organization.telecom[0].value).toBe('https://eudract.ema.europa.eu/')
    })
  })
})
