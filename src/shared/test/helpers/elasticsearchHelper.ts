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
    historique: '16/03/2023 04:29:11:En cours',
    dates_avis_favorable_ms_mns: '22.00800.000094-SM-1:07/11/2022 18:31:33, 22.00800.000094-SM-2:12/04/2023 16:15:38',
  },
  {
    etude_id: 14365,
    reglementation_code: 'REG536',
    etat: 'A_DEMARRER',
    organisme_nom: 'Centre Hospitalier Universitaire De Nantes',
    organisme_adresse: '5 Allee De L Ile Gloriette',
    organisme_code_postal: '44093',
    organisme_pays: 'France',
    organisme_ville: 'Nantes Cedex 1',
    contact_nom: 'GAUTIER',
    contact_prenom: 'Marion',
    contact_telephone: '0253482835',
    contact_courriel: 'bp-prom-regl@chu-nantes.fr',
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
    titre: 'BELASBRIDGE : Belatacept as a replacement for CNIs 3 to 12 months post-transplantation in patients with early graft dysfunction',
    intervention_faible: 'Yes',
    phase_recherche: 'Therapeutic confirmatory  (Phase III)',
    domaine_therapeutique: 'Diseases [C] - Pathological Conditions, Signs and Symptoms [C23]',
    pathologies_maladies_rares: 'Kidney transplant',
    informations_meddra: '10023438',
    taille_etude: 48,
    tranches_age: '65+ years, 18-64 years, 65+ years, 65+ years',
    sexe: 'Male,Female',
    groupes_sujet: 'Données non disponible',
    population_recrutement: null,
    date_debut_recrutement: '2022-06-01',
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
    contact_nom: 'Bond',
    contact_prenom: 'Gregor',
    contact_telephone: '+4314040043900',
    contact_courriel: 'gregor.bond@meduniwien.ac.at',
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
    historique: null,
    dates_avis_favorable_ms_mns: '22.00946.000101-SM-1:14/10/2022 20:11:18',
  },
]

export const riphDmDto = [
  {
    reglementation_code: 'REG745',
    etat: 'TERMINEE_ANTICIPEE',
    nom: "D'HONDT",
    prenom: 'Olivier',
    courriel: 'cdp_scs@soladis.fr',
    organisme: 'Soladis Clinical Studies',
    adresse: '15 Boulevard du Général Leclerc',
    code_postal: '59100',
    ville: 'Roubaix',
    pays: 'France',
    promoteur: 'Promoteur institutionnel',
    numero_national: '2021-A01563-38',
    titre_recherche: "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
    domaine_therapeutique: 'Hépato-gastro-entérologie',
    taille_etude: 96,
    qualification: 'IC-Cas 4.2',
    recherche_ancillaire_ou_extension: false,
    date_creation_etude: null,
  },
]

export const riphJardeDto1 = [
  {
    reglementation_code: 'JARDE',
    etat: 'EN_COURS',
    nom: 'GILLET',
    prenom: 'Christophe',
    courriel: 'christophe.gillet@uphf.fr',
    organisme: 'Université Polytechnique Hauts-de-France',
    adresse: 'LAMIH - Campus du Mont-Houy',
    code_postal: '59313',
    ville: 'Valenciennes',
    pays: 'France',
    promoteur: 'Promoteur institutionnel',
    numero_national: '2021-A01022-39',
    titre_recherche: 'Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.',
    domaine_therapeutique: 'Autres',
    taille_etude: 23,
    competences: null,
    recherche_ancillaire_ou_extension: false,
    qualification_recherche: 'Catégorie 3',
    date_creation_etude: null,
  },
]

export const riphJardeDto2 = [
  {
    reglementation_code: 'JARDE',
    etat: 'A_DEMARRER',
    nom: 'DOMINGUE MENA',
    prenom: 'Pascale',
    courriel: 'pascale.dominguemena@ass.nc',
    organisme: 'Agence Sanitaire et Sociale Nouvelle Calédonie ',
    adresse: '16 Rue du Général Gallieni',
    code_postal: '98800',
    ville: 'Nouméa',
    pays: 'France',
    promoteur: 'Promoteur institutionnel',
    numero_national: '2021-A01260-41',
    titre_recherche: 'Baromètre Santé Adulte 2021',
    domaine_therapeutique: 'Autres',
    taille_etude: 5500,
    competences: null,
    recherche_ancillaire_ou_extension: false,
    qualification_recherche: 'Catégorie 2',
    date_creation_etude: null,
  },
]
