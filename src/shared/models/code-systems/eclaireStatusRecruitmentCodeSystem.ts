export const eclaireStatusRecruitmentCodeSystem = {
    "resourceType": "CodeSystem",
    "id": "eclaire-status-recruitment-code-system",
    "meta": {
        "profile": ["http://hl7.org/fhir/StructureDefinition/shareablecodesystem"]
    },
    "text" : {
        "status" : "generated",
        "div" : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Narratif généré : CodeSystem eclaire-status-recruitment-code-system</b></p><a name=\"eclaire-status-recruitment-code-system\"> </a><a name=\"hceclaire-status-recruitment-code-system\"> </a><div style=\"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\"><p style=\"margin-bottom: 0px\"/><p style=\"margin-bottom: 0px\">Profil: <a href=\"http://hl7.org/fhir/R4/shareablecodesystem.html\">Shareable CodeSystem</a></p></div><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-status-recruitment-code-system</code> defines the following codes:</p><table class=\"codes\"><tr><td style=\"white-space:nowrap\"><b>Code</b></td><td><b>Display</b></td><td><b>Définition</b></td></tr><tr><td style=\"white-space:nowrap\">recruiting<a name=\"eclaire-status-recruitment-code-system-recruiting\"> </a></td><td>Actif / active</td><td>Recrutement actif</td></tr><tr><td style=\"white-space:nowrap\">upcoming<a name=\"eclaire-status-recruitment-code-system-upcoming\"> </a></td><td>A venir / Upcoming</td><td>Recrutement à venir</td></tr><tr><td style=\"white-space:nowrap\">completed-recruiting<a name=\"eclaire-status-recruitment-code-system-completed-recruiting\"> </a></td><td>Terminé / completed</td><td>Recrutement terminé</td></tr></table></div>"
    },
    "url" : "https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-status-recruitment-code-system",
    "version" : "0.3.1",
    "name" : "EclaireStatusRecruitmentCS",
    "title" : "Statut de recrutement",
    "status" : "draft",
    "experimental" : true,
    "date" : "2025-11-27T15:06:09+00:00",
    "publisher" : "ANS",
    "contact" : [
        {
            "name": "ANS",
            "telecom": [
                {
                    "system": "url",
                    "value": "https://esante.gouv.fr"
                }
            ]
        }
    ],
    "description" : "Les différents statuts de recrutement pour les essais cliniques",
    "jurisdiction" : [
        {
            "coding": [
                {
                    "system": "urn:iso:std:iso:3166",
                    "code": "FR",
                    "display": "FRANCE"
                }
            ]
        }
    ],
    "caseSensitive" : true,
    "compositional" : false,
    "content" : "complete",
    "count" : 3,
    "concept" : [
        {
            "code": "recruiting",
            "display": "Actif / active",
            "definition": "Recrutement actif"
        },
        {
            "code": "upcoming",
            "display": "A venir / Upcoming",
            "definition": "Recrutement à venir"
        },
        {
            "code": "completed-recruiting",
            "display": "Terminé / completed",
            "definition": "Recrutement terminé"
        }
    ]
}
