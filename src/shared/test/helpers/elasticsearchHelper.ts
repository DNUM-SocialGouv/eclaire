/* eslint-disable sort-keys */

import { Client } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'

import { ElasticsearchConfig } from '../../elasticsearch/ElasticsearchConfig'
import { ElasticsearchService } from '../../elasticsearch/ElasticsearchService'

export async function setupClientAndElasticsearchService() {
  process.env.SCALINGO_ELASTICSEARCH_URL = 'http://localhost:9201'
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
    elasticsearchService,
  }
}

export const riphCtisDto = [
  {
    etude_id: 13991,
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
        organisme: null,
        adresse: null,
        ville: null,
        titre: null,
        nom: null,
        prenom: null,
        service: null,
      },
    ],
    numero_ctis: '2022-500014-26-00',
    titre: 'A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER',
    phase_recherche: 'Therapeutic confirmatory  (Phase III)',
    domaine_therapeutique: 'Diseases [C] - Neoplasms [C04]',
    pathologies_maladies_rares: 'Locally-Advanced or Metastatic breast cancer (MBC)',
    informations_meddra: '10070575, 10065430',
    portee_recherche: 'Safety, Efficacy',
    taille_etude: 21,
    tranches_age: '65+ years, 18-64 years',
    sexe: 'Male,Female',
    groupes_sujet: 'Données non disponible',
    population_recrutement: 'Women of child bearing potential not using contraception, Women of child bearing potential using contraception',
    description_urgence: '',
    date_debut_recrutement: '2022-06-30',
    date_fin_etude: '2032-06-30',
    pays_concernes: 'BE, DE, ES, FR, HU, IT, PL, PT',
  },
]

export const riphDmDto = [
  {
    etude_id: 587,
    reglementation_code: 'REG745',
    etat: 'TERMINEE_ANTICIPEE',
    nom: "D'HONDT",
    prenom: 'Olivier',
    courriel: 'cdp_scs@soladis.fr',
    organisme: 'Soladis Clinical Studies',
    adresse: '15 Boulevard du Général Leclerc',
    siret: '38440926400072',
    code_postal: '59100',
    ville: 'Roubaix',
    pays: 'France',
    promoteur: 'Promoteur institutionnel',
    numero: '21.00250.000001',
    numero_national: '2021-A01563-38',
    investigateur: 'Silvana Perretta',
    titre_recherche: "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
    domaine_therapeutique: 'Hépato-gastro-entérologie',
    taille_etude: 96,
    qualification: 'IC-Cas 4.2',
    caracteristiques_recherche: null,
    recherche_ancillaire_ou_extension: false,
    date_soumission: '2021-09-28T11:54:03.626017',
    date_creation_etude: null,
    date_previsionnelle_fin_etude: null,
  },
]

export const riphJardeDto1 = [
  {
    etude_id: 1,
    reglementation_code: 'JARDE',
    etat: 'EN_COURS',
    nom: 'GILLET',
    prenom: 'Christophe',
    courriel: 'christophe.gillet@uphf.fr',
    organisme: 'Université Polytechnique Hauts-de-France',
    adresse: 'LAMIH - Campus du Mont-Houy',
    siret: '13002574500014',
    code_postal: '59313',
    ville: 'Valenciennes',
    pays: 'France',
    promoteur: 'Promoteur institutionnel',
    numero: '21.00001.000002',
    numero_national: '2021-A01022-39',
    investigateur: 'Pr. SIMONEAU Emilie',
    titre_recherche: 'Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.',
    domaine_therapeutique: 'Autres',
    taille_etude: 23,
    competences: null,
    caracteristiques_recherche: 'Recherche incluant des personnes mineures',
    recherche_ancillaire_ou_extension: false,
    qualification_recherche: 'Catégorie 3',
    date_soumission: '2021-05-29T23:55:19.705687',
    date_creation_etude: null,
    date_previsionnelle_fin_etude: null,
  },
]

export const riphJardeDto2 = [
  {
    etude_id: 10597,
    reglementation_code: 'JARDE',
    etat: 'A_DEMARRER',
    nom: 'DOMINGUE MENA',
    prenom: 'Pascale',
    courriel: 'pascale.dominguemena@ass.nc',
    organisme: 'Agence Sanitaire et Sociale Nouvelle Calédonie ',
    adresse: '16 Rue du Général Gallieni',
    siret: '20003119300010',
    code_postal: '98800',
    ville: 'Nouméa',
    pays: 'France',
    promoteur: 'Promoteur institutionnel',
    numero: '21.04081.502102',
    numero_national: '2021-A01260-41',
    investigateur: 'Agence Sanitaire et Sociale Nouvelle Calédonie',
    titre_recherche: 'Baromètre Santé Adulte 2021',
    domaine_therapeutique: 'Autres',
    taille_etude: 5500,
    competences: null,
    caracteristiques_recherche: null,
    recherche_ancillaire_ou_extension: false,
    qualification_recherche: 'Catégorie 2',
    date_soumission: '2021-12-25T10:19:39.171779',
    date_creation_etude: null,
    date_previsionnelle_fin_etude: null,
  },
]
