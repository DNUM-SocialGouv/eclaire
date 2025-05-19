export const eclaireRegulationCodeCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-regulation-code-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-regulation-code-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style="white-space:nowrap">REG536<a name="eclaire-regulation-code-code-system-REG536"> </a></td><td>REG536 (CTIS)</td></tr><tr><td style="white-space:nowrap">REG745<a name="eclaire-regulation-code-code-system-REG745"> </a></td><td>REG745 (DM)</td></tr><tr><td style="white-space:nowrap">REG746<a name="eclaire-regulation-code-code-system-REG746"> </a></td><td>REG746 (DM-DIV)</td></tr><tr><td style="white-space:nowrap">JARDE<a name="eclaire-regulation-code-code-system-JARDE"> </a></td><td>JARDE (Jarde)</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-regulation-code-code-system',
  version : '0.3.0',
  name : 'EclaireRegulationCodeCS',
  title : "Code de régulation de l'essai",
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
  description : "Code de régulation de l'essai",
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
  count : 4,
  concept : [
    {
      code : 'REG536',
      display : 'REG536 (CTIS)',
    },
    {
      code : 'REG745',
      display : 'REG745 (DM)',
    },
    {
      code : 'REG746',
      display : 'REG746 (DM-DIV)',
    },
    {
      code : 'JARDE',
      display : 'JARDE (Jarde)',
    },
  ],
}
