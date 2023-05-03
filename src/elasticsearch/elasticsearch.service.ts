import { ApiResponse, Client } from '@elastic/elasticsearch'
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import crypto from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'

import { ElasticsearchServiceErrorsException } from './elasticsearch-component-exception'
import { ClinicalTrialModel } from '../clinical-trial/gateways/model/ClinicalTrialModel'

@Injectable()
export class ElasticsearchService {
  private readonly defaultMeta = { 'eclaire-esclient-version': '0.1' }
  private readonly index: string = 'eclaire'
  private readonly type: string = 'clinicaltrial'

  constructor(private readonly client: Client) {}

  async findOneClinicalTrial(id: string): Promise<Partial<ClinicalTrialModel>> {
    try {
      const result: ApiResponse = await this.client.get({
        id: id,
        index: this.index,
        type: this.type,
      },
      { context: { meta: this.defaultMeta }, opaqueId: 'findOneClinicalTrial' })

      this.handleStatusCodeErrors(result)
      return result.body._source
    } catch (error) {
      if (error.hasOwnProperty('meta')
        && error['meta'].hasOwnProperty('statusCode')
        && error['meta']['statusCode'] === 404
      ) {
        throw new NotFoundException()
      }

      throw error
    }
  }

  async createOneClinicalTrial(payload: object): Promise<{ result: string, id: string }> {
    const uuid = crypto.randomUUID()
    if (payload.hasOwnProperty('uuid')) payload['uuid'] = uuid

    const request = await this.client.index({
      body: payload,
      id: uuid,
      index: this.index,
      type: this.type,
    },
    { context: { meta: this.defaultMeta }, opaqueId: 'createOneClinicalTrial' })

    this.handleStatusCodeErrors(request)
    return { id: request.body._id as string, result: request.body.result as string }
  }

  async updateOneClinicalTrial(id: string, payload: object): Promise<{ id: string, result: string }> {
    try {
      const request = await this.client.update({
        body: { doc: payload },
        id: id,
        index: this.index,
        type: this.type,
      },
      { context: { meta: this.defaultMeta }, opaqueId: 'updateOneClinicalTrial' })

      this.handleStatusCodeErrors(request)
      return { id: request.body._id as string, result: request.body.result as string }
    } catch (error) {
      this.handleCatchErrors(error)
    }

    throw new ElasticsearchServiceErrorsException('An unhandled error occurred - elasticsearch.service [updateOneClinicalTrial][critical]', 500)
  }

  async deleteOneClinicalTrial(id: string): Promise<{ result: string, id: string }> {
    const request = await this.client.delete({
      id: id,
      index: this.index,
      type: this.type,
    },
    { context: { meta: this.defaultMeta }, opaqueId: 'deleteOneClinicalTrial' })

    this.handleStatusCodeErrors(request)
    return { id: request.body._id as string, result: request.body.result as string }
  }

  private handleStatusCodeErrors(response: ApiResponse): void {
    switch (response.statusCode) {
      case HttpStatus.OK:
      case HttpStatus.CREATED:
      case HttpStatus.ACCEPTED:
      case HttpStatus.NO_CONTENT:
        break
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException()
      case HttpStatus.UNAUTHORIZED:
        throw new UnauthorizedException()
      case HttpStatus.FORBIDDEN:
        throw new ForbiddenException()
      case HttpStatus.NOT_FOUND:
        throw new NotFoundException()
      case HttpStatus.CONFLICT:
        throw new ConflictException()
      default:
        throw new ElasticsearchServiceErrorsException(`An unhandled error occurred - elasticsearch.service [${response.statusCode.toString()}]`, 500)
    }
  }

  private handleCatchErrors(error): void {
    if (error instanceof Error && error.name === 'ResponseError') {
      switch (error.message) {
        case 'document_missing_exception':
          throw new NotFoundException()
        default:
          throw new ElasticsearchServiceErrorsException(`An unhandled error occurred - elasticsearch.service [handleCatchErrors][${error.message}]`, 500)
      }
    }
    throw new ElasticsearchServiceErrorsException('An unhandled error occurred - elasticsearch.service [handleCatchErrors]', 500)
  }

  async importRiphClinicalTrials(): Promise<{ result: string, total: number }> {
    const responseIndexCreate = await this.client.indices.create({
      index: this.index,
      body: {
        mappings: {
          date_detection: false,
          dynamic: false,
          properties: {
            uuid: { type: 'text' },
            universal_trial_number: { type: 'text' },
            secondaries_trial_numbers: { type: 'object' },
            public_title: {
              properties: {
                acronym: { type: 'text' },
                value: { type: 'text' },
              },
            },
            scientific_title: {
              properties: {
                acronym: { type: 'text' },
                value: { type: 'text' },
              },
            },
            recruitment: {
              properties: {
                ages_range: { type: 'text' },
                ages_range_secondary_identifiers: { type: 'text' },
                clinical_trial_group: { type: 'text' },
                date_recruiting_status: { type: 'date' },
                exclusion_criteria: { type: 'text' },
                genders: { type: 'text' },
                inclusion_criteria: { type: 'text' },
                status: { type: 'text' },
                target_number: { type: 'long' },
                vulnerable_population: { type: 'text' },
              },
            },
            study_type: {
              properties: {
                phase: { type: 'text' },
                study_type: { type: 'text' },
                study_design: { type: 'text' },
              },
            },
            last_revision_date: { type: 'date' },
            contact: {
              properties: {
                public_query: {
                  properties: {
                    name: { type: 'text' },
                    firstname: { type: 'text' },
                    lastname: { type: 'text' },
                    address: { type: 'text' },
                    city: { type: 'text' },
                    country: { type: 'text' },
                    zip: { type: 'text' },
                    telephone: { type: 'text' },
                    email: { type: 'text' },
                    organization: { type: 'text' },
                    organization_id: { type: 'text' },
                    title: { type: 'text' },
                    department: { type: 'text' },
                  },
                },
                scientific_query: {
                  properties: {
                    name: { type: 'text' },
                    firstname: { type: 'text' },
                    lastname: { type: 'text' },
                    address: { type: 'text' },
                    city: { type: 'text' },
                    country: { type: 'text' },
                    zip: { type: 'text' },
                    telephone: { type: 'text' },
                    email: { type: 'text' },
                    organization: { type: 'text' },
                    organization_id: { type: 'text' },
                    title: { type: 'text' },
                    department: { type: 'text' },
                  },
                },
              },
            },
            medical_condition: { type: 'text' },
            medical_condition_meddra: { type: 'text' },
            therapeutic_areas: { type: 'object' },
            primary_sponsor: {
              properties: {
                name: { type: 'text' },
                firstname: { type: 'text' },
                lastname: { type: 'text' },
                address: { type: 'text' },
                city: { type: 'text' },
                country: { type: 'text' },
                zip: { type: 'text' },
                telephone: { type: 'text' },
                email: { type: 'text' },
                organization: { type: 'text' },
                organization_id: { type: 'text' },
                title: { type: 'text' },
                department: { type: 'text' },
              },
            },
            trial_sites: { type: 'object' },
            summary: { type: 'text' },
            clinical_trial_type: { type: 'text' },
            clinical_trial_category: { type: 'text' },
          },
        },
      },
    }, { ignore: [400] })
    console.log('--- Index Create Status Code ---')
    console.log(responseIndexCreate.statusCode)

    const content = readFileSync(join(__dirname, '../../config/export_eclair_ctis.json'), 'utf8')
    const dataset = JSON.parse(content)

    const payloadBody = dataset.data.map((item) => {
      return {
        uuid: crypto.randomUUID(),
        universal_trial_number: null,
        secondaries_trial_numbers: {
          riph: item.etude_id,
          ctis: item.numero_ctis,
        },
        public_title: { acronym: null, value: null },
        scientific_title: { acronym: null, value: item.titre },
        recruitment: {
          status: item.etat,
          date_recruiting_status: item.date_debut_recrutement,
          genders: item.sexe,
          ages_range: item.tranches_age,
          ages_range_secondary_identifiers: null,
          target_number: 0,
          exclusion_criteria: null,
          inclusion_criteria: null,
          clinical_trial_group: item.groupes_sujet,
          vulnerable_population: item.population_recrutement,
        },
        study_type: {
          phase: item.phase_recherche,
          study_type: null,
          study_design: null,
        },
        last_revision_date: null,
        contact: {
          public_query: {
            name: item.contact_prenom + ' ' + item.contact_nom,
            firstname: item.contact_prenom,
            lastname: item.contact_nom,
            address: item.organisme_adresse,
            city: item.organisme_ville,
            country: item.organisme_pays,
            zip: item.organisme_code_postal,
            telephone: item.contact_telephone,
            email: item.contact_courriel,
            organization: item.organisme_nom,
            organization_id: null,
            title: null,
            department: null,
          },
          scientific_query: {
            name: null,
            firstname: null,
            lastname: null,
            address: null,
            city: null,
            country: null,
            zip: null,
            telephone: null,
            email: null,
            organization: null,
            organization_id: null,
            title: null,
            department: null,
          },
        },
        medical_condition: item.pathologies_maladies_rares,
        medical_condition_meddra: item.informations_meddra,
        therapeutic_areas: [
          {
            value: item.domaine_therapeutique,
            code: null,
          },
        ],
        primary_sponsor: {
          name: null,
          firstname: null,
          lastname: null,
          address: null,
          city: null,
          country: null,
          zip: null,
          telephone: null,
          email: null,
          organization: null,
          organization_id: null,
          title: null,
          department: null,
        },
        trial_sites: item.sites?.map((site) => {
          return {
            name: (site.prenom ?? '') + ' ' + (site.nom ?? '').trim(),
            firstname: site.prenom,
            lastname: site.nom,
            address: site.adresse,
            city: site.ville,
            country: null,
            zip: null,
            telephone: null,
            email: null,
            organization: site.organisme,
            organization_id: null,
            title: site.titre,
            department: site.service,
          }
        }),
        summary: null,
        clinical_trial_type: null,
        clinical_trial_category: item.portee_recherche,
      }
    })

    const body = payloadBody.flatMap((doc) => [{ index: { _index: this.index } }, doc])
    const { body: bulkResponse } = await this.client.bulk({
      refresh: true,
      body,
      index: this.index,
    }, { context: { meta: this.defaultMeta }, opaqueId: 'importRiphClinicalTrials' })
    console.log('--- Bulk Response ---')
    console.log(bulkResponse)

    if (bulkResponse.errors) {
      const erroredDocuments = []
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1],
          })
        }
      })
      console.log('--- Errored Documents ---')
      console.log(erroredDocuments)
      return { result: 'failed', total: -1 }
    }

    const { body: count } = await this.client.count({ index: 'eclaire' })
    console.log('--- COUNT ---')
    console.log(count)

    return { result: 'success', total: parseInt(count.count) }
  }
}
