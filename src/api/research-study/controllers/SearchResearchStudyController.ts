import { errors } from '@elastic/elasticsearch'
import { Controller, Get, Header, Inject, Query, Res } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { Bundle, BundleEntry, Group, Location, OperationOutcome, Organization } from 'fhir/r4'

import { ResearchStudyQueryParams } from './converter/ResearchStudyQueryParams'
import { researchStudyQueryParamsToElasticsearchQuery } from './converter/researchStudyQueryParamsToElasticsearchQuery'
import { ResearchStudyQueryModel } from './ResearchStudyQueryModel'
import { ElasticsearchBodyType } from '../../../shared/elasticsearch/ElasticsearchBody'
import { BundleEntryModel } from '../../../shared/models/backbone-elements/BundleEntryModel'
import { OperationOutcomeModel } from '../../../shared/models/domain-resources/OperationOutcomeModel'
import { ResearchStudyRepository } from '../application/contracts/ResearchStudyRepository'

@ApiTags('Research study')
@Controller('R4/ResearchStudy')
export class SearchResearchStudyController {
  constructor(@Inject('ResearchStudyRepository') private readonly researchStudyRepository: ResearchStudyRepository) {}

  @ApiOperation({
    description: 'Seuls les paramètres ci-dessous sont disponibles pour le moment.<br>Les autres seront développés au besoin dans une démarche itérative.<br>Documentation FHIR sur <a href="https://hl7.org/fhir/R4/search.html">les filtres de recherche</a>.',
    summary: 'Recherche des essais cliniques selon un ou plusieurs filtres.',
  })
  @ApiOkResponse({ description: 'Des essais cliniques ont été trouvés' })
  @ApiProduces('application/fhir+json')
  @Header('content-type', 'application/fhir+json')
  @Get()
  async execute(@Query() researchStudyQuery: ResearchStudyQueryModel, @Res() response: Response): Promise<void> {
    try {
      const researchStudyQueryParams: ResearchStudyQueryParams[] = ResearchStudyQueryModel.transform(researchStudyQuery)

      const elasticsearchBody: ElasticsearchBodyType = researchStudyQueryParamsToElasticsearchQuery(researchStudyQueryParams)

      const withReferenceContents: boolean = researchStudyQueryParams.some(
        (param) => param.name === '_include' && param.value === '*'
      )

      const fhirResourceBundle: Bundle = await this.researchStudyRepository.search(
        elasticsearchBody,
        researchStudyQueryParams,
        withReferenceContents
      )

      if (withReferenceContents) {
        const additionalFhirResourceBundle: BundleEntry[] = this.getAdditionalFhirResourceBundle(fhirResourceBundle)
        fhirResourceBundle.entry.push(...additionalFhirResourceBundle)
      }

      response.json(fhirResourceBundle)
    } catch (error) {
      if (error instanceof errors.ResponseError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        const operationOutcome: OperationOutcome = OperationOutcomeModel.create(error.meta.body.error['root_cause'][0].reason)
        response.status(400).json(operationOutcome)
      } else {
        throw error
      }
    }
  }

  private getAdditionalFhirResourceBundle(fhirResourceBundle: Bundle): BundleEntry[] {
    const additionalFhirResourceBundleEntries = []

    for (const bundleEntry of fhirResourceBundle.entry) {
      const referenceContents: unknown = bundleEntry.resource['referenceContents']

      const enrollmentGroup: Group = referenceContents['enrollmentGroup'] as Group
      if (enrollmentGroup) {
        const enrollmentGroupBundleEntry: BundleEntry = BundleEntryModel.create(enrollmentGroup, process.env['ECLAIRE_URL'])
        additionalFhirResourceBundleEntries.push(enrollmentGroupBundleEntry)
      }

      const locations: Location[] = referenceContents['locations'] as Location[]
      if (locations) {
        const locationBundleEntries: BundleEntry[] = locations.map((location: Location) => {
          return BundleEntryModel.create(location, process.env['ECLAIRE_URL'])
        })

        additionalFhirResourceBundleEntries.push(...locationBundleEntries)
      }

      const organizations: Organization[] = referenceContents['organizations'] as Organization[]
      if (organizations) {
        const organizationBundleEntries: BundleEntry[] = organizations.map((organization: Organization) => {
          return BundleEntryModel.create(organization, process.env['ECLAIRE_URL'])
        })

        additionalFhirResourceBundleEntries.push(...organizationBundleEntries)
      }

      delete bundleEntry.resource['referenceContents']
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    const bundleIds = additionalFhirResourceBundleEntries.map((bundle) => bundle.resource.id)
    const additionalFhirResourceBundleEntriesFiltered =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      additionalFhirResourceBundleEntries.filter((bundle, index) => !bundleIds.includes(bundle.resource.id, index + 1))

    return [...additionalFhirResourceBundleEntriesFiltered as BundleEntry[]]
  }
}
