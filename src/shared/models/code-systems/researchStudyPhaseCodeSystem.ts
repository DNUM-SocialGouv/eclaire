export const researchStudyPhaseCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'research-study-phase',
  meta : { lastUpdated : '2019-11-01T09:29:23.356+11:00' },
  text : {
    status : 'generated',
    div : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><h2>ResearchStudyPhase</h2><div><p>Codes for the stage in the progression of a therapy from initial experimental use in humans in clinical trials to post-market evaluation.</p>\n</div><p>This code system http://terminology.hl7.org/CodeSystem/research-study-phase defines the following codes:</p><table class=\"codes\"><tr><td style=\"white-space:nowrap\"><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td style=\"white-space:nowrap\">n-a<a name=\"research-study-phase-n-a\"> </a></td><td>N/A</td><td>Trials without phases (for example, studies of devices or behavioral interventions).</td></tr><tr><td style=\"white-space:nowrap\">early-phase-1<a name=\"research-study-phase-early-phase-1\"> </a></td><td>Early Phase 1</td><td>Designation for optional exploratory trials conducted in accordance with the United States Food and Drug Administration's (FDA) 2006 Guidance on Exploratory Investigational New Drug (IND) Studies. Formerly called Phase 0.</td></tr><tr><td style=\"white-space:nowrap\">phase-1<a name=\"research-study-phase-phase-1\"> </a></td><td>Phase 1</td><td>Includes initial studies to determine the metabolism and pharmacologic actions of drugs in humans, the side effects associated with increasing doses, and to gain early evidence of effectiveness; may include healthy participants and/or patients.</td></tr><tr><td style=\"white-space:nowrap\">phase-1-phase-2<a name=\"research-study-phase-phase-1-phase-2\"> </a></td><td>Phase 1/Phase 2</td><td>Trials that are a combination of phases 1 and 2.</td></tr><tr><td style=\"white-space:nowrap\">phase-2<a name=\"research-study-phase-phase-2\"> </a></td><td>Phase 2</td><td>Includes controlled clinical studies conducted to evaluate the effectiveness of the drug for a particular indication or indications in participants with the disease or condition under study and to determine the common short-term side effects and risks.</td></tr><tr><td style=\"white-space:nowrap\">phase-2-phase-3<a name=\"research-study-phase-phase-2-phase-3\"> </a></td><td>Phase 2/Phase 3</td><td>Trials that are a combination of phases 2 and 3.</td></tr><tr><td style=\"white-space:nowrap\">phase-3<a name=\"research-study-phase-phase-3\"> </a></td><td>Phase 3</td><td>Includes trials conducted after preliminary evidence suggesting effectiveness of the drug has been obtained, and are intended to gather additional information to evaluate the overall benefit-risk relationship of the drug.</td></tr><tr><td style=\"white-space:nowrap\">phase-4<a name=\"research-study-phase-phase-4\"> </a></td><td>Phase 4</td><td>Studies of FDA-approved drugs to delineate additional information including the drug's risks, benefits, and optimal use.</td></tr></table></div>",
  },
  extension : [
    {
      url : 'http://hl7.org/fhir/StructureDefinition/structuredefinition-wg',
      valueCode : 'brr',
    },
    {
      url : 'http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status',
      valueCode : 'draft',
    },
    {
      url : 'http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm',
      valueInteger : 1,
    },
  ],
  url : 'http://terminology.hl7.org/CodeSystem/research-study-phase',
  identifier : [
    {
      system : 'urn:ietf:rfc:3986',
      value : 'urn:oid:2.16.840.1.113883.4.642.4.1247',
    },
  ],
  version : '4.0.1',
  name : 'ResearchStudyPhase',
  title : 'ResearchStudyPhase',
  status : 'draft',
  experimental : false,
  date : '2019-11-01T09:29:23+11:00',
  publisher : 'HL7 (FHIR Project)',
  contact : [
    {
      telecom : [
        {
          system : 'url',
          value : 'http://hl7.org/fhir',
        },
        {
          system : 'email',
          value : 'fhir@lists.hl7.org',
        },
      ],
    },
  ],
  description : 'Codes for the stage in the progression of a therapy from initial experimental use in humans in clinical trials to post-market evaluation.',
  caseSensitive : true,
  valueSet : 'http://hl7.org/fhir/ValueSet/research-study-phase',
  content : 'complete',
  concept : [
    {
      code : 'n-a',
      display : 'N/A',
      definition : 'Trials without phases (for example, studies of devices or behavioral interventions).',
    },
    {
      code : 'early-phase-1',
      display : 'Early Phase 1',
      definition : "Designation for optional exploratory trials conducted in accordance with the United States Food and Drug Administration's (FDA) 2006 Guidance on Exploratory Investigational New Drug (IND) Studies. Formerly called Phase 0.",
    },
    {
      code : 'phase-1',
      display : 'Phase 1',
      definition : 'Includes initial studies to determine the metabolism and pharmacologic actions of drugs in humans, the side effects associated with increasing doses, and to gain early evidence of effectiveness; may include healthy participants and/or patients.',
    },
    {
      code : 'phase-1-phase-2',
      display : 'Phase 1/Phase 2',
      definition : 'Trials that are a combination of phases 1 and 2.',
    },
    {
      code : 'phase-2',
      display : 'Phase 2',
      definition : 'Includes controlled clinical studies conducted to evaluate the effectiveness of the drug for a particular indication or indications in participants with the disease or condition under study and to determine the common short-term side effects and risks.',
    },
    {
      code : 'phase-2-phase-3',
      display : 'Phase 2/Phase 3',
      definition : 'Trials that are a combination of phases 2 and 3.',
    },
    {
      code : 'phase-3',
      display : 'Phase 3',
      definition : 'Includes trials conducted after preliminary evidence suggesting effectiveness of the drug has been obtained, and are intended to gather additional information to evaluate the overall benefit-risk relationship of the drug.',
    },
    {
      code : 'phase-4',
      display : 'Phase 4',
      definition : "Studies of FDA-approved drugs to delineate additional information including the drug's risks, benefits, and optimal use.",
    },
  ],
}
