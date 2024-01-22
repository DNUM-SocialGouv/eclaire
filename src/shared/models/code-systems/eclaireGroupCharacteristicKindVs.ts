export const eclaireGroupCharacteristicKindVs = {
  resourceType : 'CodeSystem',
  id : 'eclaire-group-characteristic-kind-code-system',
  text : {
    status : 'generated',
    div : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system</code> defines the following codes:</p><table class=\"codes\"><tr><td style=\"white-space:nowrap\"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style=\"white-space:nowrap\">grp-gender<a name=\"eclaire-group-characteristic-kind-code-system-grp-gender\"> </a></td><td>Gender (Genre)</td></tr><tr><td style=\"white-space:nowrap\">grp-studypop<a name=\"eclaire-group-characteristic-kind-code-system-grp-studypop\"> </a></td><td>Study Population (Population de l'étude)</td></tr><tr><td style=\"white-space:nowrap\">grp-category<a name=\"eclaire-group-characteristic-kind-code-system-grp-category\"> </a></td><td>Research Study Group Category (Catégorie du groupe d'étude)</td></tr><tr><td style=\"white-space:nowrap\">grp-age<a name=\"eclaire-group-characteristic-kind-code-system-grp-age\"> </a></td><td>Age (Age)</td></tr><tr><td style=\"white-space:nowrap\">grp-other<a name=\"eclaire-group-characteristic-kind-code-system-grp-other\"> </a></td><td>Other (Autre)</td></tr></table></div>",
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-group-characteristic-kind-code-system',
  version : '0.2.1',
  name : 'EclaireGroupCharacteristicKindCS',
  title : 'Codes pour le type de caractéristique du groupe',
  status : 'draft',
  date : '2024-01-11T08:51:08+00:00',
  publisher : 'ANS',
  contact : [
    {
      name : 'ANS',
      telecom : [
        {
          system : 'url',
          value : 'https://esante.gouv.fr',
        },
      ],
    },
  ],
  description : "Codes pour le type de caractéristique du groupe de l'étude",
  jurisdiction : [
    {
      coding : [
        {
          system : 'urn:iso:std:iso:3166',
          code : 'FR',
          display : 'FRANCE',
        },
      ],
    },
  ],
  caseSensitive : true,
  content : 'complete',
  count : 5,
  concept : [
    {
      code : 'grp-gender',
      display : 'Gender (Genre)',
    },
    {
      code : 'grp-studypop',
      display : "Study Population (Population de l'étude)",
    },
    {
      code : 'grp-category',
      display : "Research Study Group Category (Catégorie du groupe d'étude)",
    },
    {
      code : 'grp-age',
      display : 'Age (Age)',
    },
    {
      code : 'grp-other',
      display : 'Other (Autre)',
    },
  ],
}
