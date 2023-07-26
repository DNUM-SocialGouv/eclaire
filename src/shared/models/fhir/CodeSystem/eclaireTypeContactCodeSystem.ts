/* eslint-disable sort-keys */
export const eclaireTypeContactCodeSystem = {
  resourceType: 'CodeSystem',
  id: 'eclaire-type-contact-code-system',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p>This code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style="white-space:nowrap">PUB<a name="eclaire-type-contact-code-system-PUB"> </a></td><td>Publique / Public</td></tr><tr><td style="white-space:nowrap">SCI<a name="eclaire-type-contact-code-system-SCI"> </a></td><td>Scientifique / Scientific</td></tr></table></div>',
  },
  url: 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-type-contact-code-system',
  version: '0.1.0',
  name: 'EclaireTypeContactCS',
  title: 'Type de contact',
  status: 'draft',
  date: '2023-07-21T12:39:50+00:00',
  publisher: 'ANS',
  contact: [
    {
      name: 'ANS',
      telecom: [
        {
          system: 'url',
          value: 'https://esante.gouv.fr',
        },
      ],
    },
  ],
  description: 'Type de contact pour les essais cliniques',
  content: 'complete',
  count: 2,
  concept: [
    {
      code: 'PUB',
      display: 'Publique / Public',
    },
    {
      code: 'SCI',
      display: 'Scientifique / Scientific',
    },
  ],
}
