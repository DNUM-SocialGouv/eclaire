/* eslint-disable sort-keys */
import { Client } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'

import { ElasticsearchConfig } from '../../elasticsearch/ElasticsearchConfig'
import { ElasticsearchService } from '../../elasticsearch/ElasticsearchService'

export async function setupClientAndElasticsearchService() {
  process.env.SCALINGO_ELASTICSEARCH_URL = 'http://localhost:9201'
  process.env.ECLAIRE_URL = 'http://localhost:3000/'
  process.env.NUMBER_OF_RESSOURCE_BY_PAGE = '2'
  const configService = new ConfigService()
  const elasticsearchConfig = new ElasticsearchConfig(configService)

  const client = new Client(elasticsearchConfig.getClientOptions())
  await client.indices.delete({
    ignore_unavailable: true,
    index: 'eclaire',
  })

  const elasticsearchService = new ElasticsearchService(client)
  return {
    client,
    configService,
    elasticsearchService,
  }
}

export const riphCtisDto = [
  {
    reglementation_code: 'REG536',
    etat: 'EN_COURS',
    organisme_nom: 'F. Hoffmann-La Roche AG',
    organisme_adresse: 'Grenzacherstrasse 124',
    organisme_code_postal: '4058',
    organisme_pays: 'Switzerland',
    organisme_ville: 'Basel Town',
    contact_nom: 'Trial Information Support Line-TISL, Switzerland',
    contact_prenom: 'Head of EU',
    contact_telephone: '0041616881111',
    contact_courriel: 'global.rochegenentechtrials@roche.com',
    sites: [
      {
        organisme: 'Donnée non disponible',
        adresse: 'Avenue Eugene Avinee',
        ville: 'Lille',
        titre: 'Dr.',
        nom: 'Aumar',
        prenom: 'Madeleine',
        service: 'Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit',
      },
    ],
    numero_ctis: '2022-500014-26-00',
    titre: 'A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER',
    intervention_faible: 'No',
    phase_recherche: 'Therapeutic confirmatory  (Phase III)',
    domaine_therapeutique: 'Diseases [C] - Neoplasms [C04]',
    pathologies_maladies_rares: 'Locally-Advanced or Metastatic breast cancer (MBC)',
    informations_meddra: '10070575, 10065430',
    taille_etude: 21,
    tranches_age: '65+ years, 18-64 years',
    sexe: 'Male,Female',
    groupes_sujet: 'Données non disponible',
    population_recrutement: 'Women of child bearing potential not using contraception, Women of child bearing potential using contraception',
    date_debut_recrutement: '2022-06-30',
    historique: '2023-03-16:En cours',
    dates_avis_favorable_ms_mns: '22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12',
  },
  {
    etude_id: 14365,
    reglementation_code: 'REG536',
    etat: 'A_DEMARRER',
    organisme_nom: null,
    organisme_adresse: null,
    organisme_code_postal: null,
    organisme_pays: null,
    organisme_ville: null,
    contact_nom: null,
    contact_prenom: null,
    contact_telephone: null,
    contact_courriel: null,
    sites: [
      {
        organisme: null,
        adresse: null,
        ville: null,
        titre: null,
        nom: null,
        prenom: null,
        service: null,
      },
    ],
    numero_ctis: '2022-500299-71-00',
    titre: null,
    intervention_faible: null,
    phase_recherche: null,
    domaine_therapeutique: null,
    pathologies_maladies_rares: null,
    informations_meddra: null,
    taille_etude: null,
    tranches_age: null,
    sexe: null,
    groupes_sujet: null,
    population_recrutement: null,
    date_debut_recrutement: null,
    historique: null,
    dates_avis_favorable_ms_mns: null,
  },
  {
    reglementation_code: 'REG536',
    etat: 'A_DEMARRER',
    organisme_nom: null,
    organisme_adresse: null,
    organisme_code_postal: null,
    organisme_pays: null,
    organisme_ville: null,
    contact_nom: null,
    contact_prenom: null,
    contact_telephone: null,
    contact_courriel: null,
    sites: [
      {
        organisme: null,
        adresse: null,
        ville: null,
        titre: null,
        nom: null,
        prenom: null,
        service: null,
      },
    ],
    numero_ctis: '2022-500024-30-00',
    titre: null,
    intervention_faible: null,
    phase_recherche: null,
    domaine_therapeutique: null,
    pathologies_maladies_rares: null,
    informations_meddra: null,
    taille_etude: null,
    tranches_age: null,
    sexe: null,
    groupes_sujet: null,
    population_recrutement: null,
    date_debut_recrutement: null,
    historique: '2022-04-28:Suspendue, 2023-11-29:Terminée',
    dates_avis_favorable_ms_mns: '21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2023-04-06',
  },
]

export const riphDmDto = [
  {
    reglementation_code: 'REG745',
    etat: 'TERMINEE_ANTICIPEE',
    deposant_promoteur: 'Promoteur institutionnel',
    deposant_nom: "D'HONDT",
    deposant_prenom: 'Olivier',
    deposant_courriel: 'cdp_scs@soladis.fr',
    deposant_organisme: 'Soladis Clinical Studies',
    deposant_adresse: '15 Boulevard du Général Leclerc',
    deposant_code_postal: '59100',
    deposant_ville: 'Roubaix',
    deposant_pays: 'France',
    numero_national: '2021-A01563-38',
    titre_recherche: "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
    domaine_therapeutique: 'Hépato-gastro-entérologie',
    taille_etude: 96,
    qualification: 'IC-Cas 4.2',
    date_creation_etude: '2023-04-11',
    historique: '2023-04-06:Terminée',
    dates_avis_favorable_ms_mns: '21.01155.000011-MS01:2021-11-09, 21.01155.000011-MS02:2022-03-09, 21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2022-11-29',
  },
  {
    reglementation_code: 'REG745',
    etat: 'A_DEMARRER',
    deposant_promoteur: null,
    deposant_nom: null,
    deposant_prenom: null,
    deposant_courriel: null,
    deposant_organisme: null,
    deposant_adresse: null,
    deposant_code_postal: null,
    deposant_ville: null,
    deposant_pays: null,
    numero_national: '2021-A01563-39',
    titre_recherche: null,
    domaine_therapeutique: null,
    taille_etude: null,
    qualification: null,
    date_creation_etude: null,
    historique: null,
    dates_avis_favorable_ms_mns: null,
  },
  {
    reglementation_code: 'REG745',
    etat: 'A_DEMARRER',
    deposant_promoteur: null,
    deposant_nom: null,
    deposant_prenom: null,
    deposant_courriel: null,
    deposant_organisme: null,
    deposant_adresse: null,
    deposant_code_postal: null,
    deposant_ville: null,
    deposant_pays: null,
    numero_national: '2021-A01563-40',
    titre_recherche: null,
    domaine_therapeutique: null,
    taille_etude: null,
    qualification: null,
    date_creation_etude: null,
    historique: '2022-11-29:Terminée',
    dates_avis_favorable_ms_mns: '21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2023-04-06',
  },
]

export const riphJardeDto1 = [
  {
    reglementation_code: 'JARDE',
    etat: 'EN_COURS',
    deposant_promoteur: 'Promoteur institutionnel',
    deposant_nom: 'GILLET',
    deposant_prenom: 'Christophe',
    deposant_courriel: 'christophe.gillet@uphf.fr',
    deposant_organisme: 'Université Polytechnique Hauts-de-France',
    deposant_adresse: 'LAMIH - Campus du Mont-Houy',
    deposant_code_postal: '59313',
    deposant_ville: 'Valenciennes',
    deposant_pays: 'France',
    numero_national: '2021-A01022-39',
    titre_recherche: 'Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.',
    domaine_therapeutique: 'Autres',
    taille_etude: 23,
    competences: 'Pédiatrie',
    qualification_recherche: 'Catégorie 3',
    date_creation_etude: '2023-04-11',
    historique: '2023-04-04:En cours',
    dates_avis_favorable_ms_mns: '20.00002.210204-MS02:2021-07-29, 20.00002.210204-MS03:2021-10-26, 20.00002.210204-MS04:2023-01-26',
  },
  {
    reglementation_code: 'JARDE',
    etat: 'EN_COURS',
    deposant_promoteur: null,
    deposant_nom: null,
    deposant_prenom: null,
    deposant_courriel: null,
    deposant_organisme: null,
    deposant_adresse: null,
    deposant_code_postal: null,
    deposant_ville: null,
    deposant_pays: null,
    numero_national: '2021-A01022-39',
    titre_recherche: null,
    domaine_therapeutique: null,
    taille_etude: null,
    competences: null,
    qualification_recherche: null,
    date_creation_etude: null,
    historique: null,
    dates_avis_favorable_ms_mns: null,
  },
  {
    reglementation_code: 'JARDE',
    etat: 'EN_COURS',
    deposant_promoteur: null,
    deposant_nom: null,
    deposant_prenom: null,
    deposant_courriel: null,
    deposant_organisme: null,
    deposant_adresse: null,
    deposant_code_postal: null,
    deposant_ville: null,
    deposant_pays: null,
    numero_national: '2021-A01022-39',
    titre_recherche: null,
    domaine_therapeutique: null,
    taille_etude: null,
    competences: null,
    qualification_recherche: null,
    date_creation_etude: null,
    historique: '2022-11-29:Terminée',
    dates_avis_favorable_ms_mns: '21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2023-04-06',
  },
]

export const riphJardeDto2 = [
  {
    reglementation_code: 'JARDE',
    etat: 'A_DEMARRER',
    deposant_promoteur: 'Promoteur institutionnel',
    deposant_nom: 'DOMINGUE MENA',
    deposant_prenom: 'Pascale',
    deposant_courriel: 'pascale.dominguemena@ass.nc',
    deposant_organisme: 'Agence Sanitaire et Sociale Nouvelle Calédonie ',
    deposant_adresse: '16 Rue du Général Gallieni',
    deposant_code_postal: '98800',
    deposant_ville: 'Nouméa',
    deposant_pays: 'France',
    numero_national: '2021-A01260-41',
    titre_recherche: 'Baromètre Santé Adulte 2021',
    domaine_therapeutique: 'Autres',
    taille_etude: 5500,
    competences: null,
    qualification_recherche: 'Catégorie 2',
    date_creation_etude: '2023-04-11',
    historique: null,
    dates_avis_favorable_ms_mns: '21.04081.502102-MS01.1:2022-01-14',
  },
]
