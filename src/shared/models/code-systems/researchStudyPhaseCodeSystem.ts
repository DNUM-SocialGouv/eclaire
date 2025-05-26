export const researchStudyPhaseCodeSystem = {
  resourceType : 'CodeSystem',
  id : 'research-study-phase',
  meta : { lastUpdated : '2020-04-09T21:10:28.568+00:00' },
  text : {
    status : 'generated',
    div : "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p class=\"res-header-id\"><b>Generated Narrative: CodeSystem research-study-phase</b></p><a name=\"research-study-phase\"> </a><a name=\"hcresearch-study-phase\"> </a><a name=\"research-study-phase-en-US\"> </a><div style=\"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\"><p style=\"margin-bottom: 0px\">Last updated: 2020-04-09 21:10:28+0000</p></div><p>This case-sensitive code system <code>http://terminology.hl7.org/CodeSystem/research-study-phase</code> defines the following codes:</p><table class=\"codes\"><tr><td style=\"white-space:nowrap\"><b>Code</b></td><td><b>Display</b></td><td><b>Definition</b></td></tr><tr><td style=\"white-space:nowrap\">n-a<a name=\"research-study-phase-n-a\"> </a></td><td>N/A</td><td>Trials without phases (for example, studies of devices or behavioral interventions).</td></tr><tr><td style=\"white-space:nowrap\">early-phase-1<a name=\"research-study-phase-early-phase-1\"> </a></td><td>Early Phase 1</td><td>Designation for optional exploratory trials conducted in accordance with the United States Food and Drug Administration's (FDA) 2006 Guidance on Exploratory Investigational New Drug (IND) Studies. Formerly called Phase 0.</td></tr><tr><td style=\"white-space:nowrap\">phase-1<a name=\"research-study-phase-phase-1\"> </a></td><td>Phase 1</td><td>Includes initial studies to determine the metabolism and pharmacologic actions of drugs in humans, the side effects associated with increasing doses, and to gain early evidence of effectiveness; may include healthy participants and/or patients.</td></tr><tr><td style=\"white-space:nowrap\">phase-1-phase-2<a name=\"research-study-phase-phase-1-phase-2\"> </a></td><td>Phase 1/Phase 2</td><td>Trials that are a combination of phases 1 and 2.</td></tr><tr><td style=\"white-space:nowrap\">phase-2<a name=\"research-study-phase-phase-2\"> </a></td><td>Phase 2</td><td>Includes controlled clinical studies conducted to evaluate the effectiveness of the drug for a particular indication or indications in participants with the disease or condition under study and to determine the common short-term side effects and risks.</td></tr><tr><td style=\"white-space:nowrap\">phase-2-phase-3<a name=\"research-study-phase-phase-2-phase-3\"> </a></td><td>Phase 2/Phase 3</td><td>Trials that are a combination of phases 2 and 3.</td></tr><tr><td style=\"white-space:nowrap\">phase-3<a name=\"research-study-phase-phase-3\"> </a></td><td>Phase 3</td><td>Includes trials conducted after preliminary evidence suggesting effectiveness of the drug has been obtained, and are intended to gather additional information to evaluate the overall benefit-risk relationship of the drug.</td></tr><tr><td style=\"white-space:nowrap\">phase-4<a name=\"research-study-phase-phase-4\"> </a></td><td>Phase 4</td><td>Studies of FDA-approved drugs to delineate additional information including the drug's risks, benefits, and optimal use.</td></tr></table></div>",
  },
  extension : [
    {
      url : 'http://hl7.org/fhir/StructureDefinition/structuredefinition-wg',
      valueCode : 'brr',
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
      value : 'urn:oid:2.16.840.1.113883.4.642.1.1247',
    },
  ],
  version : '1.0.0',
  name : 'ResearchStudyPhase',
  title : 'ResearchStudyPhase',
  status : 'active',
  experimental : false,
  date : '2020-04-09T21:10:28+00:00',
  publisher : 'Health Level Seven International',
  contact : [
    {
      telecom : [
        {
          system : 'url',
          value : 'http://hl7.org',
        },
        {
          system : 'email',
          value : 'hq@HL7.org',
        },
      ],
    },
  ],
  description : 'Codes for the stage in the progression of a therapy from initial experimental use in humans in clinical trials to post-market evaluation.',
  copyright : 'This material derives from the HL7 Terminology (THO). THO is copyright ©1989+ Health Level Seven International and is made available under the CC0 designation. For more licensing information see: https://terminology.hl7.org/license.html',
  caseSensitive : true,
  valueSet : 'http://terminology.hl7.org/ValueSet/research-study-phase',
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
