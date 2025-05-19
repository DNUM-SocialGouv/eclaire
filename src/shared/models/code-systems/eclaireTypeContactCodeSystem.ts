export const eclaireTypeContactCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-type-contact-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style="white-space:nowrap">PUB<a name="eclaire-type-contact-code-system-PUB"> </a></td><td>Publique / Public</td></tr><tr><td style="white-space:nowrap">SCI<a name="eclaire-type-contact-code-system-SCI"> </a></td><td>Scientifique / Scientific</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system',
  version : '0.3.0',
  name : 'EclaireTypeContactCS',
  title : 'Type de contact',
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
  description : 'Type de contact pour les essais cliniques',
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
  count : 2,
  concept : [
    {
      code : 'PUB',
      display : 'Publique / Public',
    },
    {
      code : 'SCI',
      display : 'Scientifique / Scientific',
    },
  ],
}
