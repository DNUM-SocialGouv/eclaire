import { RiphDmResearchStudyModelFactory } from './RiphDmResearchStudyModelFactory'
import { riphDmDto } from '../shared/test/helpers/elasticsearchHelper'

describe('dm research study model factory', () => {
  it('should build a DM research study model, when RIPH DM with all fields filled is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const normalResearchStudyDto = riphDmDto[0]

    // WHEN
    const researchStudyModel = RiphDmResearchStudyModelFactory.create(normalResearchStudyDto)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "REG745",
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
                "display": "INDISPONIBLE",
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
                "code": "INDISPONIBLE",
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
            "name": "Olivier D'HONDT",
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
                "value": "cdp_scs@soladis.fr",
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
                      "code": undefined,
                      "display": undefined,
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
                  "low": undefined,
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
                      "display": "INDISPONIBLE",
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
                      "display": "INDISPONIBLE",
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
            "id": "2021-A01563-38-enrollment-group-id",
            "identifier": undefined,
            "implicitRules": undefined,
            "language": undefined,
            "managingEntity": undefined,
            "member": undefined,
            "meta": undefined,
            "name": undefined,
            "quantity": 96,
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
            "reference": "#2021-A01563-38-enrollment-group-id",
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
              "reference": "Organization/2021-A01563-38-secondary-sponsor",
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
            "valueString": "Hépato-gastro-entérologie",
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
        "id": "2021-A01563-38",
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
              "reference": "Organization/ansm",
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "secondary",
            "value": "2021-A01563-38",
          },
        ],
        "implicitRules": undefined,
        "keyword": undefined,
        "language": undefined,
        "location": undefined,
        "meta": MetaModel {
          "id": undefined,
          "lastUpdated": "2023-04-06T00:00:00.000Z",
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
                  "city": "Roubaix",
                  "country": "France",
                  "district": undefined,
                  "line": [
                    "15 Boulevard du Général Leclerc",
                  ],
                  "period": undefined,
                  "postalCode": "59100",
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
                    "family": "D'HONDT",
                    "given": [
                      "Olivier",
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
                      "value": "cdp_scs@soladis.fr",
                    },
                  ],
                },
              ],
              "contained": undefined,
              "endpoint": undefined,
              "id": "2021-A01563-38-primary-sponsor",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "Promoteur institutionnel",
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
              "id": "2021-A01563-38-secondary-sponsor",
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
                "ansm",
              ],
              "contact": undefined,
              "contained": undefined,
              "endpoint": [
                ReferenceModel {
                  "display": undefined,
                  "id": undefined,
                  "identifier": undefined,
                  "reference": "https://ansm.sante.fr",
                  "type": undefined,
                },
              ],
              "id": "ansm",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "Agence nationale de sécurité du médicament et des produits de santé",
              "partOf": undefined,
              "resourceType": "Organization",
              "telecom": undefined,
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
          "reference": "Organization/2021-A01563-38-primary-sponsor",
          "type": "Organization",
        },
        "status": "administratively-completed",
        "text": undefined,
        "title": "ÉVALUATION DU DISPOSITIF MEDICAL ENDOTRAP POUR LA PROTECTION DU PERSONNEL DU BLOC OPERATOIRE CONTRE LES PARTICULES MICROBIENNES PENDANT L'ENDOSCOPIE DIGESTIVE HAUTE ",
      }
    `)
  })

  it('should build a DM research study model, when RIPH DM with null fields is given', () => {
    // GIVEN
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 0, 1))
    const researchStudyDtoWithEmptyFields = riphDmDto[1]

    // WHEN
    const researchStudyModel = RiphDmResearchStudyModelFactory.create(researchStudyDtoWithEmptyFields)

    // THEN
    expect(researchStudyModel).toMatchInlineSnapshot(`
      ResearchStudyModel {
        "arm": undefined,
        "category": [
          CodeableConceptModel {
            "coding": [
              CodingModel {
                "code": undefined,
                "display": "REG745",
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
                "display": "INDISPONIBLE",
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
                "code": "INDISPONIBLE",
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
            "name": " ",
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
                      "code": undefined,
                      "display": undefined,
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
                  "low": undefined,
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
                      "display": "INDISPONIBLE",
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
                      "display": "INDISPONIBLE",
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
            "id": "2021-A01563-39-enrollment-group-id",
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
            "reference": "#2021-A01563-39-enrollment-group-id",
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
              "reference": "Organization/2021-A01563-39-secondary-sponsor",
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
        "id": "2021-A01563-39",
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
              "reference": "Organization/ansm",
              "type": "Organization",
            },
            "id": undefined,
            "period": undefined,
            "system": undefined,
            "type": undefined,
            "use": "secondary",
            "value": "2021-A01563-39",
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
                      "value": "INDISPONIBLE",
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
              "id": "2021-A01563-39-primary-sponsor",
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
              "id": "2021-A01563-39-secondary-sponsor",
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
                "ansm",
              ],
              "contact": undefined,
              "contained": undefined,
              "endpoint": [
                ReferenceModel {
                  "display": undefined,
                  "id": undefined,
                  "identifier": undefined,
                  "reference": "https://ansm.sante.fr",
                  "type": undefined,
                },
              ],
              "id": "ansm",
              "identifier": undefined,
              "implicitRules": undefined,
              "language": undefined,
              "meta": undefined,
              "name": "Agence nationale de sécurité du médicament et des produits de santé",
              "partOf": undefined,
              "resourceType": "Organization",
              "telecom": undefined,
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
          "reference": "Organization/2021-A01563-39-primary-sponsor",
          "type": "Organization",
        },
        "status": "approved",
        "text": undefined,
        "title": "",
      }
    `)
  })
})
