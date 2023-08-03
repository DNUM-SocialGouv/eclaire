import { RiphCtisResearchStudyModelFactory } from './RiphCtisResearchStudyModelFactory'
import { riphCtisDto } from '../shared/test/helpers/elasticsearchHelper'

describe('ctis research study model factory', () => {
  it('should build a CTIS research study model, when RIPH CTIS with all fields filled is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const normalResearchStudyDto = riphCtisDto[0]

    // WHEN
    const researchStudyModel = RiphCtisResearchStudyModelFactory.create(normalResearchStudyDto)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "REG536",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Regulation Code",
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "Locally-Advanced or Metastatic breast cancer (MBC)",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Disease Condition",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "10070575",
                "display": "MedDRA",
                "id": undefined,
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "userSelected": undefined,
                "version": "2.0.1",
              },
              CodingModel {
                "code": "10065430",
                "display": "MedDRA",
                "id": undefined,
                "system": "http://terminology.hl7.org/CodeSystem/mdr",
                "userSelected": undefined,
                "version": "2.0.1",
              },
            ],
            "id": undefined,
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "extension": undefined,
            "id": undefined,
            "name": "Head of EU Trial Information Support Line-TISL, Switzerland",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "0041616881111",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
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
                "id": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition-eclaire-contact-type.html",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "SCI",
                      "display": "Scientifique / Scientific",
                      "id": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem-eclaire-type-contact-code-system.html",
                      "userSelected": undefined,
                      "version": "0.1.0",
                    },
                  ],
                  "id": undefined,
                  "text": "Contact Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "INDISPONIBLE",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition-eclaire-contact-type.html",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "PUB",
                      "display": "Publique / Public",
                      "id": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem-eclaire-type-contact-code-system.html",
                      "userSelected": undefined,
                      "version": "0.1.0",
                    },
                  ],
                  "id": undefined,
                  "text": "Contact Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "INDISPONIBLE",
              },
            ],
          },
        ],
        "contained": [
          GroupModel {
            "active": undefined,
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "male",
                      "display": "Male",
                      "id": undefined,
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "userSelected": undefined,
                      "version": "5.0.0",
                    },
                    CodingModel {
                      "code": "female",
                      "display": "Female",
                      "id": undefined,
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "userSelected": undefined,
                      "version": "5.0.0",
                    },
                  ],
                  "id": undefined,
                  "text": "Genders",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": undefined,
                "valueQuantity": undefined,
                "valueRange": RangeModel {
                  "high": undefined,
                  "id": undefined,
                  "low": QuantityModel {
                    "code": undefined,
                    "comparator": ">=",
                    "id": undefined,
                    "system": undefined,
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
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": undefined,
                "valueQuantity": undefined,
                "valueRange": RangeModel {
                  "high": QuantityModel {
                    "code": undefined,
                    "comparator": "<=",
                    "id": undefined,
                    "system": undefined,
                    "unit": "years",
                    "value": 64,
                  },
                  "id": undefined,
                  "low": QuantityModel {
                    "code": undefined,
                    "comparator": ">=",
                    "id": undefined,
                    "system": undefined,
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
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "Données non disponible",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Research Study Group Category",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "Women of child bearing potential not using contraception, Women of child bearing potential using contraception",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Study Population",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Study Inclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": true,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Study Exclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "code": undefined,
            "id": "2022-500014-26-00-enrollment-group-id",
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": 21,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "id": undefined,
            "identifier": undefined,
            "reference": "#2022-500014-26-00-enrollment-group-id",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "extension": undefined,
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor",
            "valueCodeableConcept": undefined,
            "valueReference": ReferenceModel {
              "display": "Reference to secondary sponsor",
              "id": undefined,
              "identifier": undefined,
              "reference": "Organization/2022-500014-26-00-secondary-sponsor",
              "type": "Organization",
            },
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueCodeableConcept": undefined,
            "valueReference": undefined,
            "valueString": "Diseases [C] - Neoplasms [C04]",
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "labelValue",
                "valueCodeableConcept": undefined,
                "valueReference": undefined,
                "valueString": "INDISPONIBLE",
              },
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "labelType",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "human-use",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Label Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label",
            "valueCodeableConcept": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "labelValue",
                "valueCodeableConcept": undefined,
                "valueReference": undefined,
                "valueString": "INDISPONIBLE",
              },
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "labelType",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "acronym",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Label Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label",
            "valueCodeableConcept": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "focus": undefined,
        "id": "2022-500014-26-00",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "id": undefined,
              "identifier": undefined,
              "reference": undefined,
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "official",
            "value": "INDISPONIBLE",
          },
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to secondary assigner",
              "id": undefined,
              "identifier": undefined,
              "reference": "Organization/ctis",
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "secondary",
            "value": "2022-500014-26-00",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "BE",
                "display": "Belgium",
                "id": undefined,
                "system": "urn:iso:std:iso:3166",
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "DE",
                "display": "Germany",
                "id": undefined,
                "system": "urn:iso:std:iso:3166",
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "ES",
                "display": "Spain",
                "id": undefined,
                "system": "urn:iso:std:iso:3166",
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "FR",
                "display": "France",
                "id": undefined,
                "system": "urn:iso:std:iso:3166",
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "HU",
                "display": "Hungary",
                "id": undefined,
                "system": "urn:iso:std:iso:3166",
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "IT",
                "display": "Italy",
                "id": undefined,
                "system": "urn:iso:std:iso:3166",
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "PL",
                "display": "Poland",
                "id": undefined,
                "system": "urn:iso:std:iso:3166",
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Countries of recruitment",
          },
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": "PT",
                "display": "Portugal",
                "id": undefined,
                "system": "urn:iso:std:iso:3166",
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Countries of recruitment",
          },
        ],
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "2023-04-12T00:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
          "security": undefined,
          "source": undefined,
          "tag": undefined,
          "versionId": undefined,
        },
        "objective": undefined,
        "partOf": undefined,
        "period": undefined,
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "phase-3",
              "display": "Phase 3",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "userSelected": undefined,
              "version": "4.0.1",
            },
          ],
          "id": undefined,
          "text": "Research Study Phase",
        },
        "primaryPurposeType": undefined,
        "principalInvestigator": undefined,
        "protocol": undefined,
        "reasonStopped": undefined,
        "referenceContents": ReferenceContentsModel {
          "organizations": [
            OrganizationModel {
              "active": true,
              "address": [
                AddressModel {
                  "city": "Basel Town",
                  "country": "Switzerland",
                  "district": undefined,
                  "line": [
                    "Grenzacherstrasse 124",
                  ],
                  "period": undefined,
                  "postalCode": "4058",
                  "state": undefined,
                  "text": undefined,
                  "type": "physical",
                  "use": "work",
                },
              ],
              "alias": undefined,
              "contact": [
                OrganizationContactModel {
                  "address": undefined,
                  "id": undefined,
                  "name": HumanNameModel {
                    "family": "Trial Information Support Line-TISL, Switzerland",
                    "given": [
                      "Head of EU",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "id": undefined,
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "userSelected": undefined,
                        "version": "4.0.1",
                      },
                    ],
                    "id": undefined,
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "0041616881111",
                    },
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "global.rochegenentechtrials@roche.com",
                    },
                  ],
                },
              ],
              "contained": undefined,
              "endpoint": undefined,
              "id": "2022-500014-26-00-primary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "F. Hoffmann-La Roche AG",
              "partOf": undefined,
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "id": undefined,
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "userSelected": undefined,
                      "version": "4.0.1",
                    },
                  ],
                  "id": undefined,
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "active": true,
              "address": [
                AddressModel {
                  "city": "INDISPONIBLE",
                  "country": "INDISPONIBLE",
                  "district": undefined,
                  "line": [
                    "INDISPONIBLE",
                  ],
                  "period": undefined,
                  "postalCode": "INDISPONIBLE",
                  "state": undefined,
                  "text": undefined,
                  "type": "physical",
                  "use": "work",
                },
              ],
              "alias": undefined,
              "contact": [
                OrganizationContactModel {
                  "address": undefined,
                  "id": undefined,
                  "name": HumanNameModel {
                    "family": "INDISPONIBLE",
                    "given": [
                      "INDISPONIBLE",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "id": undefined,
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "userSelected": undefined,
                        "version": "4.0.1",
                      },
                    ],
                    "id": undefined,
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                  ],
                },
              ],
              "contained": undefined,
              "endpoint": undefined,
              "id": "2022-500014-26-00-secondary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "INDISPONIBLE",
              "partOf": undefined,
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "id": undefined,
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "userSelected": undefined,
                      "version": "4.0.1",
                    },
                  ],
                  "id": undefined,
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "active": true,
              "address": undefined,
              "alias": [
                "ctis",
              ],
              "contact": undefined,
              "contained": undefined,
              "endpoint": undefined,
              "id": "ctis",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "Clinical Trials Information System",
              "partOf": undefined,
              "resourceType": "Organization",
              "telecom": [
                ContactPointModel {
                  "id": undefined,
                  "period": undefined,
                  "rank": undefined,
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
        "sponsor": ReferenceModel {
          "display": "Reference to primary sponsor",
          "id": undefined,
          "identifier": undefined,
          "reference": "Organization/2022-500014-26-00-primary-sponsor",
          "type": "Organization",
        },
        "status": "active",
        "text": undefined,
        "title": "A PHASE III, RANDOMIZED, OPEN-LABEL STUDY EVALUATING THE EFFICACY AND SAFETY OF GIREDESTRANT IN COMBINATION WITH PHESGO VERSUS PHESGO AFTER INDUCTION THERAPY WITH PHESGO+TAXANE IN PATIENTS WITH PREVIOUSLY UNTREATED HER2-POSITIVE, ESTROGEN RECEPTOR-POSITIVE LOCALLY-ADVANCED OR METASTATIC BREAST CANCER",
      }
    `)
  })

  it('should build a CTIS research study model, when RIPH CTIS with null fields is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const researchStudyDtoWithEmptyFields = riphCtisDto[1]

    // WHEN
    const researchStudyModel = RiphCtisResearchStudyModelFactory.create(researchStudyDtoWithEmptyFields)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "REG536",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Regulation Code",
          },
        ],
        "condition": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "",
                "id": undefined,
                "system": undefined,
                "userSelected": undefined,
                "version": undefined,
              },
            ],
            "id": undefined,
            "text": "Disease Condition",
          },
          CodeableConceptModel {
            "coding": [],
            "id": undefined,
            "text": "MedDRA Condition",
          },
        ],
        "contact": [
          ContactDetailModel {
            "extension": undefined,
            "id": undefined,
            "name": " ",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition-eclaire-contact-type.html",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "SCI",
                      "display": "Scientifique / Scientific",
                      "id": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem-eclaire-type-contact-code-system.html",
                      "userSelected": undefined,
                      "version": "0.1.0",
                    },
                  ],
                  "id": undefined,
                  "text": "Contact Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "INDISPONIBLE",
              },
            ],
          },
          ContactDetailModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition-eclaire-contact-type.html",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "PUB",
                      "display": "Publique / Public",
                      "id": undefined,
                      "system": "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem-eclaire-type-contact-code-system.html",
                      "userSelected": undefined,
                      "version": "0.1.0",
                    },
                  ],
                  "id": undefined,
                  "text": "Contact Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "name": "INDISPONIBLE INDISPONIBLE",
            "telecom": [
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "phone",
                "use": "work",
                "value": "INDISPONIBLE",
              },
              ContactPointModel {
                "id": undefined,
                "period": undefined,
                "rank": undefined,
                "system": "email",
                "use": "work",
                "value": "INDISPONIBLE",
              },
            ],
          },
        ],
        "contained": [
          GroupModel {
            "active": undefined,
            "actual": true,
            "characteristic": [
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "unknown",
                      "display": "Unknown",
                      "id": undefined,
                      "system": "http://hl7.org/fhir/administrative-gender",
                      "userSelected": undefined,
                      "version": "5.0.0",
                    },
                  ],
                  "id": undefined,
                  "text": "Genders",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Research Study Group Category",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Study Population",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": false,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Study Inclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
              GroupCharacteristicModel {
                "code": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Group characteristic code",
                },
                "exclude": true,
                "id": undefined,
                "period": undefined,
                "valueBoolean": undefined,
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "INDISPONIBLE",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Study Exclusion Criteria",
                },
                "valueQuantity": undefined,
                "valueRange": undefined,
                "valueReference": undefined,
              },
            ],
            "code": undefined,
            "id": "2022-500299-71-00-enrollment-group-id",
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": undefined,
            "resourceType": "Group",
            "type": "person",
          },
        ],
        "description": "INDISPONIBLE",
        "enrollment": [
          ReferenceModel {
            "display": "Reference to group detailing study characteristics",
            "id": undefined,
            "identifier": undefined,
            "reference": "#2022-500299-71-00-enrollment-group-id",
            "type": "Group",
          },
        ],
        "extension": [
          ExtensionModel {
            "extension": undefined,
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-secondary-sponsor",
            "valueCodeableConcept": undefined,
            "valueReference": ReferenceModel {
              "display": "Reference to secondary sponsor",
              "id": undefined,
              "identifier": undefined,
              "reference": "Organization/2022-500299-71-00-secondary-sponsor",
              "type": "Organization",
            },
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": undefined,
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-therapeutic-area",
            "valueCodeableConcept": undefined,
            "valueReference": undefined,
            "valueString": "",
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "labelValue",
                "valueCodeableConcept": undefined,
                "valueReference": undefined,
                "valueString": "INDISPONIBLE",
              },
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "labelType",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "human-use",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Label Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label",
            "valueCodeableConcept": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
          ExtensionModel {
            "extension": [
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "labelValue",
                "valueCodeableConcept": undefined,
                "valueReference": undefined,
                "valueString": "INDISPONIBLE",
              },
              ExtensionModel {
                "extension": undefined,
                "id": undefined,
                "url": "labelType",
                "valueCodeableConcept": CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": undefined,
                      "display": "acronym",
                      "id": undefined,
                      "system": undefined,
                      "userSelected": undefined,
                      "version": undefined,
                    },
                  ],
                  "id": undefined,
                  "text": "Label Type",
                },
                "valueReference": undefined,
                "valueString": undefined,
              },
            ],
            "id": undefined,
            "url": "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-label",
            "valueCodeableConcept": undefined,
            "valueReference": undefined,
            "valueString": undefined,
          },
        ],
        "focus": undefined,
        "id": "2022-500299-71-00",
        "identifier": [
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to primary assigner",
              "id": undefined,
              "identifier": undefined,
              "reference": undefined,
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "official",
            "value": "INDISPONIBLE",
          },
          IdentifierModel {
            "assigner": ReferenceModel {
              "display": "Reference to secondary assigner",
              "id": undefined,
              "identifier": undefined,
              "reference": "Organization/ctis",
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "secondary",
            "value": "2022-500299-71-00",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": undefined,
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "2021-12-31T23:00:00.000Z",
          "profile": [
            "https://interop.esante.gouv.fr/ig/fhir/eclaire/StructureDefinition/eclaire-researchstudy",
          ],
          "security": undefined,
          "source": undefined,
          "tag": undefined,
          "versionId": undefined,
        },
        "objective": undefined,
        "partOf": undefined,
        "period": undefined,
        "phase": CodeableConceptModel {
          "coding": [
            CodingModel {
              "code": "n-a",
              "display": "N/A",
              "id": undefined,
              "system": "http://terminology.hl7.org/CodeSystem/research-study-phase",
              "userSelected": undefined,
              "version": "4.0.1",
            },
          ],
          "id": undefined,
          "text": "Research Study Phase",
        },
        "primaryPurposeType": undefined,
        "principalInvestigator": undefined,
        "protocol": undefined,
        "reasonStopped": undefined,
        "referenceContents": ReferenceContentsModel {
          "organizations": [
            OrganizationModel {
              "active": true,
              "address": [
                AddressModel {
                  "city": "",
                  "country": "",
                  "district": undefined,
                  "line": [
                    "",
                  ],
                  "period": undefined,
                  "postalCode": "",
                  "state": undefined,
                  "text": undefined,
                  "type": "physical",
                  "use": "work",
                },
              ],
              "alias": undefined,
              "contact": [
                OrganizationContactModel {
                  "address": undefined,
                  "id": undefined,
                  "name": HumanNameModel {
                    "family": "",
                    "given": [
                      "",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "id": undefined,
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "userSelected": undefined,
                        "version": "4.0.1",
                      },
                    ],
                    "id": undefined,
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "",
                    },
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "",
                    },
                  ],
                },
              ],
              "contained": undefined,
              "endpoint": undefined,
              "id": "2022-500299-71-00-primary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "",
              "partOf": undefined,
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "id": undefined,
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "userSelected": undefined,
                      "version": "4.0.1",
                    },
                  ],
                  "id": undefined,
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "active": true,
              "address": [
                AddressModel {
                  "city": "INDISPONIBLE",
                  "country": "INDISPONIBLE",
                  "district": undefined,
                  "line": [
                    "INDISPONIBLE",
                  ],
                  "period": undefined,
                  "postalCode": "INDISPONIBLE",
                  "state": undefined,
                  "text": undefined,
                  "type": "physical",
                  "use": "work",
                },
              ],
              "alias": undefined,
              "contact": [
                OrganizationContactModel {
                  "address": undefined,
                  "id": undefined,
                  "name": HumanNameModel {
                    "family": "INDISPONIBLE",
                    "given": [
                      "INDISPONIBLE",
                    ],
                    "id": undefined,
                    "period": undefined,
                    "prefix": undefined,
                    "suffix": undefined,
                    "text": undefined,
                    "use": "official",
                  },
                  "purpose": CodeableConceptModel {
                    "coding": [
                      CodingModel {
                        "code": "ADMIN",
                        "display": "Administrative",
                        "id": undefined,
                        "system": "http://terminology.hl7.org/CodeSystem/contactentity-type",
                        "userSelected": undefined,
                        "version": "4.0.1",
                      },
                    ],
                    "id": undefined,
                    "text": "Organization Contact Purpose",
                  },
                  "telecom": [
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "phone",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                    ContactPointModel {
                      "id": undefined,
                      "period": undefined,
                      "rank": undefined,
                      "system": "email",
                      "use": "work",
                      "value": "INDISPONIBLE",
                    },
                  ],
                },
              ],
              "contained": undefined,
              "endpoint": undefined,
              "id": "2022-500299-71-00-secondary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "INDISPONIBLE",
              "partOf": undefined,
              "resourceType": "Organization",
              "telecom": undefined,
              "type": [
                CodeableConceptModel {
                  "coding": [
                    CodingModel {
                      "code": "crs",
                      "display": "Clinical Research Sponsor",
                      "id": undefined,
                      "system": "http://terminology.hl7.org/CodeSystem/organization-type",
                      "userSelected": undefined,
                      "version": "4.0.1",
                    },
                  ],
                  "id": undefined,
                  "text": "Organization Sponsor Type",
                },
              ],
            },
            OrganizationModel {
              "active": true,
              "address": undefined,
              "alias": [
                "ctis",
              ],
              "contact": undefined,
              "contained": undefined,
              "endpoint": undefined,
              "id": "ctis",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "Clinical Trials Information System",
              "partOf": undefined,
              "resourceType": "Organization",
              "telecom": [
                ContactPointModel {
                  "id": undefined,
                  "period": undefined,
                  "rank": undefined,
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
        "sponsor": ReferenceModel {
          "display": "Reference to primary sponsor",
          "id": undefined,
          "identifier": undefined,
          "reference": "Organization/2022-500299-71-00-primary-sponsor",
          "type": "Organization",
        },
        "status": "approved",
        "text": undefined,
        "title": "",
      }
    `)
  })
})
