export const eclaireStudyStatusCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-study-status-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-status-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td></tr><tr><td style="white-space:nowrap">a-demarrer<a name="eclaire-study-status-code-system-a-demarrer"> </a></td><td>A démarrer</td></tr><tr><td style="white-space:nowrap">en-cours<a name="eclaire-study-status-code-system-en-cours"> </a></td><td>En cours</td></tr><tr><td style="white-space:nowrap">suspendue<a name="eclaire-study-status-code-system-suspendue"> </a></td><td>Suspendue</td></tr><tr><td style="white-space:nowrap">prorogee<a name="eclaire-study-status-code-system-prorogee"> </a></td><td>Prorogée</td></tr><tr><td style="white-space:nowrap">expiree<a name="eclaire-study-status-code-system-expiree"> </a></td><td>Expirée</td></tr><tr><td style="white-space:nowrap">terminee<a name="eclaire-study-status-code-system-terminee"> </a></td><td>Terminée</td></tr><tr><td style="white-space:nowrap">terminee-fin-anticipee<a name="eclaire-study-status-code-system-terminee-fin-anticipee"> </a></td><td>Terminée (fin anticipée)</td></tr><tr><td style="white-space:nowrap">archivee<a name="eclaire-study-status-code-system-archivee"> </a></td><td>Archivée</td></tr><tr><td style="white-space:nowrap">abandonnee<a name="eclaire-study-status-code-system-abandonnee"> </a></td><td>Abandonnée</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-study-status-code-system',
  version : '0.3.0',
  name : 'EclaireStudyStatusCS',
  title : "Définition des statuts de l'essai utilisés dans la base de données ECLAIRE",
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
  description : "Statut de l'essai clinique utilisé dans la base de données ECLAIRE",
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
  count : 9,
  concept : [
    {
      code : 'a-demarrer',
      display : 'A démarrer',
    },
    {
      code : 'en-cours',
      display : 'En cours',
    },
    {
      code : 'suspendue',
      display : 'Suspendue',
    },
    {
      code : 'prorogee',
      display : 'Prorogée',
    },
    {
      code : 'expiree',
      display : 'Expirée',
    },
    {
      code : 'terminee',
      display : 'Terminée',
    },
    {
      code : 'terminee-fin-anticipee',
      display : 'Terminée (fin anticipée)',
    },
    {
      code : 'archivee',
      display : 'Archivée',
    },
    {
      code : 'abandonnee',
      display : 'Abandonnée',
    },
  ],
}
