import { Client } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

import { ElasticsearchServiceError } from './ElasticsearchServiceError'
import { ElasticsearchServiceNotFound } from './ElasticsearchServiceNotFound'

@Injectable()
export class ElasticsearchService {
  private readonly index = 'eclaire'
  private readonly type = '_doc'

  constructor(private readonly client: Client) {}

  async createAnIndice<T>(mapping: T) {
    try {
      const exist = await this.client.indices.exists({ index: this.index })
      if (exist.statusCode === 404) {
        console.log(`Elastic: L'index ${this.index} n'existe pas. Veuillez patienter...`)
        await this.client.indices.create({
          body: { mappings: mapping },
          index: this.index,
        }, { ignore: [400] })
        console.log(`Elastic: L'index ${this.index} a été créé.`)
        return
      }
      console.log(`Elastic: L'index ${this.index} existe déjà. Aucune création ne sera effectuée.`)
    } catch (error) {
      throw new ElasticsearchServiceError(error as string)
    }
  }

  async findOneDocument<T>(id: string): Promise<Partial<T>> {
    try {
      const request = await this.client.get({
        id,
        index: this.index,
        type: this.type,
      })

      if (request.body.found) {
        return request.body._source as T
      }
    } catch (error) {
      console.log(error)
      throw new ElasticsearchServiceError(error as string)
    }

    throw new ElasticsearchServiceNotFound()
  }

  async bulkDocuments<T>(documents: T[]): Promise<void> {
    let response = undefined
    try {
      console.log('Elastic: Début de la commande bulk...')
      const { body: bulkResponse } = await this.client.bulk({
        body: documents,
        index: this.index,
        refresh: true,
      })
      response = bulkResponse
      console.log('Elastic: La commande bulk a réussi !')
    } catch (error) {
      console.log('Elastic: La commande bulk a échoué - Erreurs du Client Elasticsearch')
      console.log(error['meta'])
      console.log(error['meta']['body']['error'])
    }

    if (response?.errors) {
      console.log(`Elastic: Des erreurs ont été trouvé en résultat de la commande bulk (${String(response.status)})`)
      const erroredDocuments = []
      // La présence de la clé `error` indique que l'opération effectué pour le document a échoué
      response.items?.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            // Si le status est 429, cela signifie que l'on peut retenter l'opération sur le document
            // Sinon, il est très fort probable que ça soit une erreur de mapping.
            // Vous devriez corriger la structure du document avant de réessayer
            status: action[operation].status,
            error: action[operation].error,
            operation: documents[i * 2],
            document: documents[i * 2 + 1],
          })
        }
      })
      console.log('Elastic: Liste des documents en erreurs ci dessous ->')
      console.log(erroredDocuments)
      throw new ElasticsearchServiceError('Elastic: La commande bulk a échoué')
    }
  }
}
