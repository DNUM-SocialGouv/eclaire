export const eclaireStatusRecruitmentCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'eclaire-status-recruitment-code-system',
  text : {
    status : 'generated',
    div : '<div xmlns="http://www.w3.org/1999/xhtml"><p>This case-sensitive code system <code>https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-status-recruitment-code-system</code> defines the following codes:</p><table class="codes"><tr><td style="white-space:nowrap"><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td style="white-space:nowrap">recruiting<a name="eclaire-status-recruitment-code-system-recruiting"> </a></td><td>Actif / active</td><td>Recrutement actif</td></tr><tr><td style="white-space:nowrap">completed-recruiting<a name="eclaire-status-recruitment-code-system-completed-recruiting"> </a></td><td>Terminé / completed </td><td>Recrutement terminé</td></tr></table></div>',
  },
  url : 'https://interop.esante.gouv.fr/ig/fhir/eclaire/CodeSystem/eclaire-status-recruitment-code-system',
  version : '0.3.0',
  name : 'EclaireStatusRecruitmentCS',
  title : 'Statut de recrutement',
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
  description : 'Les différents statuts de recrutement pour les essais cliniques',
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
      code : 'recruiting',
      display : 'Actif / active',
      definition : 'Recrutement actif',
    },
    {
      code : 'completed-recruiting',
      display : 'Terminé / completed',
      definition : 'Recrutement terminé',
    },
  ],
}
