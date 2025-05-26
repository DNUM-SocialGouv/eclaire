import { ResearchStudyModelFactory } from './ResearchStudyModelFactory'
import { RiphDtoTestFactory } from '../../shared/test/helpers/RiphDtoTestFactory'
import { EclaireDto } from '../dto/EclaireDto'

describe('research study model factory', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should build a research study model, when a RIPH CTIS object with all fields filled is given', () => {
    expect(ResearchStudyModelFactory.create(EclaireDto.fromCtis(RiphDtoTestFactory.ctis()))).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "REG536",
                "display": "REG536 (CTIS)",
                "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-regulation-code-code-system",
                "version": "0.3.0",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "study-ctis",
                "display": "un essai clinique (CTIS)",
                "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-reglementation-precision-code-system",
                "version": "0.3.0",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": undefined,
            "id": "disease-condition-2022-500014-26-00",
            "text": "Locally-Advanced or Metastatic breast cancer (MBC)",
          },
        ],
        "contact": [
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-name",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": HumanNameModel {
                  "family": "Trial Information Support Line-TISL, Switzerland",
                  "given": [
                    "Head of EU",
                  ],
                  "prefix": undefined,
                  "use": "official",
                },
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": "0041616881111",
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": "global.rochegenentechtrials@roche.com",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-name",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": HumanNameModel {
                  "family": undefined,
                  "given": [],
                  "prefix": undefined,
                  "use": "official",
                },
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type",
                "valueAddress": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "PUB",
                      "display": "Publique / Public",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": undefined,
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": undefined,
              },
            ],
          },
        ],
        "description": undefined,
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "Group/2022-500014-26-00-enrollment-group",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2023-04-12T00:00:00.000Z",
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": "Diseases [C] - Neoplasms [C04]",
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-recruitment-period",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valueMarkdown": undefined,
            "valuePeriod": PeriodModel {
              "end": undefined,
              "start": "2022-06-30T00:00:00.000Z",
            },
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "name",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": "F. Hoffmann-La Roche AG",
              },
              ExtensionModel {
                "extension": undefined,
                "url": "role",
                "valueAddress": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "lead-sponsor",
                      "display": "lead-sponsor",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-party-role-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
              ExtensionModel {
                "extension": undefined,
                "url": "party",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": ReferenceModel {
                  "display": "Reference to primary sponsor",
                  "reference": "Organization/2022-500014-26-00-primary-sponsor",
                  "type": "Organization",
                },
                "valueString": undefined,
              },
            ],
            "url": "http://hl7.org/fhir/5.0/StructureDefinition/extension-ResearchStudy.associatedParty",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2022-500014-26-00",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "reference": "Organization/ctis",
              "type": "Organization",
            },
            "period": undefined,
            "use": "official",
            "value": "2022-500014-26-00",
          },
        ],
        "location": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "BE",
                "display": "Belgium",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "DE",
                "display": "Germany",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "ES",
                "display": "Spain",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "FR",
                "display": "France",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "HU",
                "display": "Hungary",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "IT",
                "display": "Italy",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "PL",
                "display": "Poland",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "PT",
                "display": "Portugal",
                "system": "urn:iso:std:iso:3166",
                "version": "4.0.1",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
        ],
        "meta": MetaModel {
          "lastUpdated": "2023-04-12T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
        },
        "originalContentsToEnhance": OriginalContentsToEnhanceModel {
          "meddraCodes": [
            "10070575",
            "10065430",
          ],
        },
        "period": undefined,
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "phase-3",
              "display": "Phase 3",
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "version": "1.0.0",
            },
          ],
          "id": undefined,
          "text": undefined,
        },
        "primaryPurposeType": undefined,
        "referenceContents": ReferenceContentsModel {
          "enrollmentGroup": GroupModel {
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-gender",
                      "display": "Gender (Genre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
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
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-age",
                      "display": "Age (Age)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": undefined,
                "valueQuantity": undefined,
                "valueRange": RangeModel {
                  "high": undefined,
                  "low": QuantityModel {
                    "unit": "years",
                    "value": 65,
                  },
                },
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-age",
                      "display": "Age (Age)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": undefined,
                "valueQuantity": undefined,
                "valueRange": RangeModel {
                  "high": QuantityModel {
                    "unit": "years",
                    "value": 64,
                  },
                  "low": QuantityModel {
                    "unit": "years",
                    "value": 18,
                  },
                },
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-category",
                      "display": "Research Study Group Category (Catégorie du groupe d'étude)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "Données non disponible",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-studypop",
                      "display": "Study Population (Population de l'étude)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "no-using-contraception",
                      "display": "Women of child bearing potential not using contraception (Femmes en âge de procréer n'utilisant pas de contraception)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system",
                      "version": "0.3.0",
                    },
                    CodingModel {
                      "code": "using-contraception",
                      "display": "Women of child bearing potential using contraception (Femmes en âge de procréer utilisant une méthode de contraception)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST INCLUSION",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": true,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST EXCLUSION",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST PRINCIPAL",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST SECONDAIRE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "id": "2022-500014-26-00-enrollment-group",
            "quantity": 21,
            "resourceType": "Group",
            "type": "person",
          },
          "locations": [
            LocationModel {
              "address": AddressModel {
                "city": "Lille",
                "country": undefined,
                "line": [
                  "Avenue Eugene Avinee",
                  "Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit",
                ],
                "postalCode": undefined,
                "type": "physical",
                "use": "work",
              },
              "id": "2022-500014-26-00-0-site",
              "identifier": [
                IdentifierModel {
                  "assigner": undefined,
                  "period": undefined,
                  "use": "official",
                  "value": "2022-500014-26-00-0-site",
                },
              ],
              "name": "Donnée non disponible",
              "resourceType": "Location",
              "telecom": [
                ContactPointModel {
                  "extension": [
                    ExtensionModel {
                      "extension": undefined,
                      "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-site-contact-name",
                      "valueAddress": undefined,
                      "valueCodeableConcept": undefined,
                      "valueDuration": undefined,
                      "valueHumanName": HumanNameModel {
                        "family": "Aumar",
                        "given": [
                          "Madeleine",
                        ],
                        "prefix": [
                          "Dr.",
                        ],
                        "use": "official",
                      },
                      "valueInstant": undefined,
                      "valueMarkdown": undefined,
                      "valuePeriod": undefined,
                      "valueReference": undefined,
                      "valueString": undefined,
                    },
                  ],
                  "system": undefined,
                  "use": "work",
                  "value": undefined,
                },
              ],
            },
          ],
          "organizations": [
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
            },
          ],
        },
        "relatedArtifact": undefined,
        "resourceType": "ResearchStudy",
        "site": [
          ReferenceModel {
            "display": "Reference to site",
            "reference": "Location/2022-500014-26-00-0-site",
            "type": "Location",
          },
        ],
        "status": "active",
        "text": NarrativeModel {
          "div": "<div xmlns="http://www.w3.org/1999/xhtml"><h2>Données reçues avant modélisation FHIR</h2><ul><li> reglementation_code: REG536 </li><li> precision_reglementation: un essai clinique (CTIS) </li><li> etat: EN_COURS </li><li> organisme_nom: F. Hoffmann-La Roche AG </li><li> organisme_adresse: Grenzacherstrasse 124 </li><li> organisme_code_postal: 4058 </li><li> organisme_pays: Switzerland </li><li> organisme_ville: Basel Town </li><li> contact_nom: Trial Information Support Line-TISL, Switzerland </li><li> contact_prenom: Head of EU </li><li> contact_telephone: 0041616881111 </li><li> contact_courriel: global.rochegenentechtrials@roche.com </li><li> sites: Organisme: Donnée non disponible - Adresse: Avenue Eugene Avinee - Ville: Lille - Titre: Dr. - Nom: Aumar - Prenom: Madeleine - Service: Gastroenterology Hepatology and Nutrition Unit Paediatric clinic, Child Unit </li><li> numero_primaire: 2022-500014-26-00 </li><li> titre: A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER </li><li> phase_recherche: Phase III </li><li> domaine_therapeutique: Diseases [C] - Neoplasms [C04] </li><li> pathologies_maladies_rares: Locally-Advanced or Metastatic breast cancer (MBC) </li><li> informations_meddra: 10070575,10065430 </li><li> taille_etude: 21 </li><li> tranches_age: 65+ years,18-64 years </li><li> sexe: Male,Female </li><li> groupes_sujet: Données non disponible </li><li> population_recrutement: Women of child bearing potential not using contraception,Women of child bearing potential using contraception </li><li> date_debut_recrutement: 2022-06-30T00:00:00.000Z </li><li> historique: 2023-03-16:En cours </li><li> dates_avis_favorable_ms_mns: 22.00800.000094-SM-1:2022-11-07, 22.00800.000094-SM-2:2023-04-12 </li><li> pays_concernes: BE,DE,ES,FR,HU,IT,PL,PT </li><li> date_theorique_maximale_autorisation_cpp: 2023-03-15 </li><li> contact_public: Nom: null - Prenom: null Courriel: null Tel: null </li><li> criteres_eligibilite: Titre: null - Type: null,Titre: TEST INCLUSION - Type: INCLUSION,Titre: TEST EXCLUSION - Type: EXCLUSION </li><li> criteres_jugement: Titre: null - Type: null,Titre: TEST PRINCIPAL - Type: PRINCIPAL,Titre: TEST SECONDAIRE - Type: SECONDAIRE </li><li> objectifs: null </li><li> resume: null </li><li> statut_recrutement: Recrutement en attente </li><li> date_fin_recrutement: null </li></ul></div>",
          "status": "extensions",
        },
        "title": "A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER",
        "translatedContent": undefined,
      }
    `)
  })

  it('should build a research study model, when a RIPH DM object with all fields filled is given', () => {
    expect(ResearchStudyModelFactory.create(EclaireDto.fromDm(RiphDtoTestFactory.dm()))).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "REG745",
                "display": "REG745 (DM)",
                "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-regulation-code-code-system",
                "version": "0.3.0",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "IC-Cas-4-2",
                "display": "IC-Cas 4.2 (DM)",
                "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-reglementation-precision-code-system",
                "version": "0.3.0",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
        ],
        "condition": undefined,
        "contact": [
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-name",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": HumanNameModel {
                  "family": undefined,
                  "given": [],
                  "prefix": undefined,
                  "use": "official",
                },
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type",
                "valueAddress": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "PUB",
                      "display": "Publique / Public",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": undefined,
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": undefined,
              },
            ],
          },
        ],
        "description": undefined,
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "Group/2021-A01563-38-enrollment-group",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2023-04-06T00:00:00.000Z",
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": "Hépato-gastro-entérologie",
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "name",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": "Soladis Clinical Studies",
              },
              ExtensionModel {
                "extension": undefined,
                "url": "role",
                "valueAddress": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "lead-sponsor",
                      "display": "lead-sponsor",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-party-role-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
              ExtensionModel {
                "extension": undefined,
                "url": "party",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": ReferenceModel {
                  "display": "Reference to primary sponsor",
                  "reference": "Organization/2021-A01563-38-primary-sponsor",
                  "type": "Organization",
                },
                "valueString": undefined,
              },
            ],
            "url": "http://hl7.org/fhir/5.0/StructureDefinition/extension-ResearchStudy.associatedParty",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2021-A01563-38",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "reference": "Organization/ansm",
              "type": "Organization",
            },
            "period": undefined,
            "use": "official",
            "value": "2021-A01563-38",
          },
        ],
        "location": undefined,
        "meta": MetaModel {
          "lastUpdated": "2023-04-06T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
        },
        "originalContentsToEnhance": undefined,
        "period": undefined,
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "n-a",
              "display": "N/A",
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "version": "1.0.0",
            },
          ],
          "id": undefined,
          "text": undefined,
        },
        "primaryPurposeType": undefined,
        "referenceContents": ReferenceContentsModel {
          "enrollmentGroup": GroupModel {
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-gender",
                      "display": "Gender (Genre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "unknown",
                      "display": "Unknown",
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "version": "5.0.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-studypop",
                      "display": "Study Population (Population de l'étude)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST INCLUSION",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": true,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST EXCLUSION",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST PRINCIPAL",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST SECONDAIRE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "id": "2021-A01563-38-enrollment-group",
            "quantity": 96,
            "resourceType": "Group",
            "type": "person",
          },
          "locations": undefined,
          "organizations": [
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
            },
          ],
        },
        "relatedArtifact": undefined,
        "resourceType": "ResearchStudy",
        "site": undefined,
        "status": "administratively-completed",
        "text": NarrativeModel {
          "div": "<div xmlns="http://www.w3.org/1999/xhtml"><h2>Données reçues avant modélisation FHIR</h2><ul><li> reglementation_code: REG745 </li><li> precision_reglementation: IC-Cas 4.2 </li><li> etat: TERMINEE_ANTICIPEE </li><li> organisme_nom: Soladis Clinical Studies </li><li> organisme_adresse: 15 Boulevard du Général Leclerc </li><li> organisme_code_postal: 59100 </li><li> organisme_pays: France </li><li> organisme_ville: Roubaix </li><li> contact_nom: null </li><li> contact_prenom: null </li><li> contact_telephone: null </li><li> contact_courriel: null </li><li> sites: Organisme: null - Adresse: null - Ville: null - Titre: null - Nom: null - Prenom: null - Service: null </li><li> numero_primaire: 2021-A01563-38 </li><li> titre: ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE  </li><li> phase_recherche: N/A </li><li> domaine_therapeutique: Hépato-gastro-entérologie </li><li> pathologies_maladies_rares: null </li><li> informations_meddra: undefined </li><li> taille_etude: 96 </li><li> tranches_age: undefined </li><li> sexe: unknown </li><li> groupes_sujet: null </li><li> population_recrutement:  </li><li> date_debut_recrutement: null </li><li> historique: 2023-04-06:Terminée </li><li> dates_avis_favorable_ms_mns: 21.01155.000011-MS01:2021-11-09, 21.01155.000011-MS02:2022-03-09, 21.01155.000011-MS03:2022-10-04, 21.01155.000011-MS04.1:2022-11-29 </li><li> pays_concernes: undefined </li><li> date_theorique_maximale_autorisation_cpp: 2023-04-23 </li><li> contact_public: Nom: null - Prenom: null Courriel: null Tel: null </li><li> criteres_eligibilite: Titre: null - Type: null,Titre: TEST INCLUSION - Type: INCLUSION,Titre: TEST EXCLUSION - Type: EXCLUSION </li><li> criteres_jugement: Titre: null - Type: null,Titre: TEST PRINCIPAL - Type: PRINCIPAL,Titre: TEST SECONDAIRE - Type: SECONDAIRE </li><li> objectifs: null </li><li> resume: null </li><li> statut_recrutement: Recrutement en attente </li><li> date_fin_recrutement: null </li></ul></div>",
          "status": "extensions",
        },
        "title": "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
        "translatedContent": undefined,
      }
    `)
  })

  it('should build a research study model, when a RIPH Jarde object with all fields filled is given', () => {
    expect(ResearchStudyModelFactory.create(EclaireDto.fromJarde(RiphDtoTestFactory.jarde()))).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "JARDE",
                "display": "JARDE (Jarde)",
                "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-regulation-code-code-system",
                "version": "0.3.0",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "cat3-jarde",
                "display": "Catégorie 3 (JARDE)",
                "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-reglementation-precision-code-system",
                "version": "0.3.0",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
        ],
        "condition": undefined,
        "contact": [
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-name",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": HumanNameModel {
                  "family": undefined,
                  "given": [],
                  "prefix": undefined,
                  "use": "official",
                },
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type",
                "valueAddress": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "PUB",
                      "display": "Publique / Public",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": undefined,
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": undefined,
              },
            ],
          },
        ],
        "description": undefined,
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "Group/2021-A01022-39-enrollment-group",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2023-04-04T00:00:00.000Z",
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": "Autres",
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "name",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": "Université Polytechnique Hauts-de-France",
              },
              ExtensionModel {
                "extension": undefined,
                "url": "role",
                "valueAddress": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "lead-sponsor",
                      "display": "lead-sponsor",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-party-role-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
              ExtensionModel {
                "extension": undefined,
                "url": "party",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": ReferenceModel {
                  "display": "Reference to primary sponsor",
                  "reference": "Organization/2021-A01022-39-primary-sponsor",
                  "type": "Organization",
                },
                "valueString": undefined,
              },
            ],
            "url": "http://hl7.org/fhir/5.0/StructureDefinition/extension-ResearchStudy.associatedParty",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": undefined,
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2021-A01022-39",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "reference": "Organization/ansm",
              "type": "Organization",
            },
            "period": undefined,
            "use": "official",
            "value": "2021-A01022-39",
          },
        ],
        "location": undefined,
        "meta": MetaModel {
          "lastUpdated": "2023-04-04T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
        },
        "originalContentsToEnhance": undefined,
        "period": undefined,
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "phase-1",
              "display": "Phase 1",
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "version": "1.0.0",
            },
          ],
          "id": undefined,
          "text": undefined,
        },
        "primaryPurposeType": undefined,
        "referenceContents": ReferenceContentsModel {
          "enrollmentGroup": GroupModel {
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-gender",
                      "display": "Gender (Genre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "unknown",
                      "display": "Unknown",
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "version": "5.0.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-studypop",
                      "display": "Study Population (Population de l'étude)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-population-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "id": "2021-A01022-39-enrollment-group",
            "quantity": 23,
            "resourceType": "Group",
            "type": "person",
          },
          "locations": undefined,
          "organizations": [
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
            },
          ],
        },
        "relatedArtifact": undefined,
        "resourceType": "ResearchStudy",
        "site": undefined,
        "status": "active",
        "text": NarrativeModel {
          "div": "<div xmlns="http://www.w3.org/1999/xhtml"><h2>Données reçues avant modélisation FHIR</h2><ul><li> reglementation_code: JARDE </li><li> precision_reglementation: Catégorie 3 </li><li> etat: EN_COURS </li><li> organisme_nom: Université Polytechnique Hauts-de-France </li><li> organisme_adresse: LAMIH - Campus du Mont-Houy </li><li> organisme_code_postal: 59313 </li><li> organisme_pays: France </li><li> organisme_ville: Valenciennes </li><li> contact_nom: null </li><li> contact_prenom: null </li><li> contact_telephone: null </li><li> contact_courriel: null </li><li> sites: Organisme: null - Adresse: null - Ville: null - Titre: null - Nom: null - Prenom: null - Service: null </li><li> numero_primaire: 2021-A01022-39 </li><li> titre: Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage. </li><li> phase_recherche: Phase I </li><li> domaine_therapeutique: Autres </li><li> pathologies_maladies_rares: null </li><li> informations_meddra: undefined </li><li> taille_etude: 23 </li><li> tranches_age: undefined </li><li> sexe: unknown </li><li> groupes_sujet: null </li><li> population_recrutement:  </li><li> date_debut_recrutement: null </li><li> historique: 2023-04-04:En cours </li><li> dates_avis_favorable_ms_mns: 20.00002.210204-MS02:2021-07-29, 20.00002.210204-MS03:2021-10-26, 20.00002.210204-MS04:2023-01-26 </li><li> pays_concernes: undefined </li><li> date_theorique_maximale_autorisation_cpp: 2023-04-30 </li><li> contact_public: Nom: null - Prenom: null Courriel: null Tel: null </li><li> criteres_eligibilite: Titre: null - Type: null </li><li> criteres_jugement: Titre: null - Type: null </li><li> objectifs: null </li><li> resume: null </li><li> statut_recrutement: Recrutement en attente </li><li> date_fin_recrutement: null </li></ul></div>",
          "status": "extensions",
        },
        "title": "Détermination des paramètres biomécaniques et fonctionnels de la locomotion des enfants en fonction des conditions de chaussage.",
        "translatedContent": undefined,
      }
    `)
  })

  it('should build a research study model, when null fields is given', () => {
    expect(ResearchStudyModelFactory.create(EclaireDto.fromCtis(RiphDtoTestFactory.emptyCtis()))).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "REG536",
                "display": "REG536 (CTIS)",
                "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-regulation-code-code-system",
                "version": "0.3.0",
              },
            ],
            "id": undefined,
            "text": undefined,
          },
        ],
        "condition": undefined,
        "contact": [
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-name",
                "valueAddress": undefined,
                "valueCodeableConcept": undefined,
                "valueDuration": undefined,
                "valueHumanName": HumanNameModel {
                  "family": undefined,
                  "given": [],
                  "prefix": undefined,
                  "use": "official",
                },
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
              ExtensionModel {
                "extension": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-contact-type",
                "valueAddress": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "PUB",
                      "display": "Publique / Public",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueDuration": undefined,
                "valueHumanName": undefined,
                "valueInstant": undefined,
                "valueMarkdown": undefined,
                "valuePeriod": undefined,
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "telecom": [
              ContactPointModel {
                "extension": undefined,
                "system": "phone",
                "use": "work",
                "value": undefined,
              },
              ContactPointModel {
                "extension": undefined,
                "system": "email",
                "use": "work",
                "value": undefined,
              },
            ],
          },
        ],
        "description": undefined,
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "reference": "Group/2022-500299-71-00-enrollment-group",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "extension": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-review-date",
            "valueAddress": undefined,
            "valueCodeableConcept": undefined,
            "valueDuration": undefined,
            "valueHumanName": undefined,
            "valueInstant": "2023-03-15T00:00:00.000Z",
            "valueMarkdown": undefined,
            "valuePeriod": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "id": "2022-500299-71-00",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "reference": "Organization/ctis",
              "type": "Organization",
            },
            "period": undefined,
            "use": "official",
            "value": "2022-500299-71-00",
          },
        ],
        "location": undefined,
        "meta": MetaModel {
          "lastUpdated": "2023-03-15T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
        },
        "originalContentsToEnhance": undefined,
        "period": undefined,
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "n-a",
              "display": "N/A",
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "version": "1.0.0",
            },
          ],
          "id": undefined,
          "text": undefined,
        },
        "primaryPurposeType": undefined,
        "referenceContents": ReferenceContentsModel {
          "enrollmentGroup": GroupModel {
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-gender",
                      "display": "Gender (Genre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "unknown",
                      "display": "Unknown",
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "version": "5.0.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST INCLUSION",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": true,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST EXCLUSION",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST PRINCIPAL",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "grp-other",
                      "display": "Other (Autre)",
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system",
                      "version": "0.3.0",
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "exclude": false,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "TEST SECONDAIRE",
                      "system": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": undefined,
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "id": "2022-500299-71-00-enrollment-group",
            "quantity": undefined,
            "resourceType": "Group",
            "type": "person",
          },
          "locations": undefined,
          "organizations": [
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
            },
          ],
        },
        "relatedArtifact": undefined,
        "resourceType": "ResearchStudy",
        "site": undefined,
        "status": "approved",
        "text": NarrativeModel {
          "div": "<div xmlns="http://www.w3.org/1999/xhtml"><h2>Données reçues avant modélisation FHIR</h2><ul><li> reglementation_code: REG536 </li><li> precision_reglementation: null </li><li> etat: A_DEMARRER </li><li> organisme_nom: null </li><li> organisme_adresse: null </li><li> organisme_code_postal: null </li><li> organisme_pays: null </li><li> organisme_ville: null </li><li> contact_nom: null </li><li> contact_prenom: null </li><li> contact_telephone: null </li><li> contact_courriel: null </li><li> sites: Organisme: null - Adresse: null - Ville: null - Titre: null - Nom: null - Prenom: null - Service: null </li><li> numero_primaire: 2022-500299-71-00 </li><li> titre: null </li><li> phase_recherche: N/A </li><li> domaine_therapeutique: null </li><li> pathologies_maladies_rares: null </li><li> informations_meddra: undefined </li><li> taille_etude: null </li><li> tranches_age: undefined </li><li> sexe: unknown </li><li> groupes_sujet: null </li><li> population_recrutement: undefined </li><li> date_debut_recrutement: null </li><li> historique: null </li><li> dates_avis_favorable_ms_mns: null </li><li> pays_concernes: undefined </li><li> date_theorique_maximale_autorisation_cpp: 2023-03-15 </li><li> contact_public: Nom: null - Prenom: null Courriel: null Tel: null </li><li> criteres_eligibilite: Titre: null - Type: null,Titre: TEST INCLUSION - Type: INCLUSION,Titre: TEST EXCLUSION - Type: EXCLUSION </li><li> criteres_jugement: Titre: null - Type: null,Titre: TEST PRINCIPAL - Type: PRINCIPAL,Titre: TEST SECONDAIRE - Type: SECONDAIRE </li><li> objectifs: null </li><li> resume: null </li><li> statut_recrutement: null </li><li> date_fin_recrutement: null </li></ul></div>",
          "status": "extensions",
        },
        "title": undefined,
        "translatedContent": undefined,
      }
    `)
  })
})
