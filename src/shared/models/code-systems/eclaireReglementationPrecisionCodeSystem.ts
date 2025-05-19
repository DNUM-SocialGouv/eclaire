export const eclaireReglementationPrecisionCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-reglementation-precision-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-reglementation-precision-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style="white-space:nowrap">IC-Cas-1<a name="eclaire-reglementation-precision-code-system-IC-Cas-1"> </a></td><td>IC-Cas 1 (DM)</td></tr><tr><td style="white-space:nowrap">IC-Cas-2<a name="eclaire-reglementation-precision-code-system-IC-Cas-2"> </a></td><td>IC-Cas 2 (DM)</td></tr><tr><td style="white-space:nowrap">IC-Cas-3<a name="eclaire-reglementation-precision-code-system-IC-Cas-3"> </a></td><td>IC-Cas 3 (DM)</td></tr><tr><td style="white-space:nowrap">IC-Cas-4-1<a name="eclaire-reglementation-precision-code-system-IC-Cas-4-1"> </a></td><td>IC-Cas 4.1 (DM)</td></tr><tr><td style="white-space:nowrap">IC-Cas-4-2<a name="eclaire-reglementation-precision-code-system-IC-Cas-4-2"> </a></td><td>IC-Cas 4.2 (DM)</td></tr><tr><td style="white-space:nowrap">IC-Cas-4-3<a name="eclaire-reglementation-precision-code-system-IC-Cas-4-3"> </a></td><td>IC-Cas 4.3 (DM)</td></tr><tr><td style="white-space:nowrap">IC-Cas-4-4<a name="eclaire-reglementation-precision-code-system-IC-Cas-4-4"> </a></td><td>IC-Cas 4.4 (DM)</td></tr><tr><td style="white-space:nowrap">EP-Cas-1<a name="eclaire-reglementation-precision-code-system-EP-Cas-1"> </a></td><td>EP-Cas 1 (DM)</td></tr><tr><td style="white-space:nowrap">EP-Cas-2<a name="eclaire-reglementation-precision-code-system-EP-Cas-2"> </a></td><td>EP-Cas 2 (DM)</td></tr><tr><td style="white-space:nowrap">EP-Cas-3<a name="eclaire-reglementation-precision-code-system-EP-Cas-3"> </a></td><td>EP-Cas 3 (DM)</td></tr><tr><td style="white-space:nowrap">cat1-jarde<a name="eclaire-reglementation-precision-code-system-cat1-jarde"> </a></td><td>Catégorie 1 (JARDE)</td></tr><tr><td style="white-space:nowrap">cat2-jarde<a name="eclaire-reglementation-precision-code-system-cat2-jarde"> </a></td><td>Catégorie 2 (JARDE)</td></tr><tr><td style="white-space:nowrap">cat3-jarde<a name="eclaire-reglementation-precision-code-system-cat3-jarde"> </a></td><td>Catégorie 3 (JARDE)</td></tr><tr><td style="white-space:nowrap">cat3-questionnaire-jarde<a name="eclaire-reglementation-precision-code-system-cat3-questionnaire-jarde"> </a></td><td>Catégorie 3 questionnaire (JARDE)</td></tr><tr><td style="white-space:nowrap">derog-obligation-info-jarde<a name="eclaire-reglementation-precision-code-system-derog-obligation-info-jarde"> </a></td><td>Dérogation à l’obligation d’information (JARDE)</td></tr><tr><td style="white-space:nowrap">study-low-inter-ctis<a name="eclaire-reglementation-precision-code-system-study-low-inter-ctis"> </a></td><td>un essai clinique à faible intervention (CTIS)</td></tr><tr><td style="white-space:nowrap">study-ctis<a name="eclaire-reglementation-precision-code-system-study-ctis"> </a></td><td>un essai clinique (CTIS)</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-reglementation-precision-code-system',
  version : '0.3.0',
  name : 'EclaireReglementationPrecisionCS',
  title : "Précision sur la réglementation concernant l'essai",
  status : 'draft',
  date : '2024-02-26T13:35:44+00:00',
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
  description : "Précision sur la réglementation concernant l'essai",
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
  count : 17,
  concept : [
    {
      code : 'IC-Cas-1',
      display : 'IC-Cas 1 (DM)',
    },
    {
      code : 'IC-Cas-2',
      display : 'IC-Cas 2 (DM)',
    },
    {
      code : 'IC-Cas-3',
      display : 'IC-Cas 3 (DM)',
    },
    {
      code : 'IC-Cas-4-1',
      display : 'IC-Cas 4.1 (DM)',
    },
    {
      code : 'IC-Cas-4-2',
      display : 'IC-Cas 4.2 (DM)',
    },
    {
      code : 'IC-Cas-4-3',
      display : 'IC-Cas 4.3 (DM)',
    },
    {
      code : 'IC-Cas-4-4',
      display : 'IC-Cas 4.4 (DM)',
    },
    {
      code : 'EP-Cas-1',
      display : 'EP-Cas 1 (DM)',
    },
    {
      code : 'EP-Cas-2',
      display : 'EP-Cas 2 (DM)',
    },
    {
      code : 'EP-Cas-3',
      display : 'EP-Cas 3 (DM)',
    },
    {
      code : 'cat1-jarde',
      display : 'Catégorie 1 (JARDE)',
    },
    {
      code : 'cat2-jarde',
      display : 'Catégorie 2 (JARDE)',
    },
    {
      code : 'cat3-jarde',
      display : 'Catégorie 3 (JARDE)',
    },
    {
      code : 'cat3-questionnaire-jarde',
      display : 'Catégorie 3 questionnaire (JARDE)',
    },
    {
      code : 'derog-obligation-info-jarde',
      display : 'Dérogation à l’obligation d’information (JARDE)',
    },
    {
      code : 'study-low-inter-ctis',
      display : 'un essai clinique à faible intervention (CTIS)',
    },
    {
      code : 'study-ctis',
      display : 'un essai clinique (CTIS)',
    },
  ],
}
