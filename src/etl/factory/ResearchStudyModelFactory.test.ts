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
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition-eclaire-associated-party-r5.html",
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
              "code": "phase-III",
              "display": "Therapeutic confirmatory  (Phase III)",
              "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-phase-source-code-system",
              "version": "0.3.0",
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
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition-eclaire-associated-party-r5.html",
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
              "version": "4.0.1",
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
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition-eclaire-associated-party-r5.html",
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
              "code": "phase-I-other",
              "display": "Human Pharmacology (Phase I) -  Other",
              "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-phase-source-code-system",
              "version": "0.3.0",
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
              "version": "4.0.1",
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
        "title": undefined,
        "translatedContent": undefined,
      }
    `)
  })
})
