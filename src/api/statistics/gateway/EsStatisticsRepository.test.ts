import { describe, it, expect, vi, beforeEach } from 'vitest'

import { EsStatisticsRepository } from './EsStatisticsRepository'
import { ElasticsearchService } from '../../../shared/elasticsearch/ElasticsearchService'

// Création d'un mock pour ElasticsearchService
const mockCountDocuments = vi.fn()

const mockElasticsearchService = { countDocuments: mockCountDocuments } as unknown as ElasticsearchService

describe('esStatisticsRepository', () => {
  let repository: EsStatisticsRepository

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    mockCountDocuments.mockReset()
    repository = new EsStatisticsRepository(mockElasticsearchService)
  })

  it('should return correct statistics', async () => {
    // On définit ce que les appels successifs à countDocuments doivent retourner
    mockCountDocuments
      .mockResolvedValueOnce(100) // total
      .mockResolvedValueOnce(20) // REG745
      .mockResolvedValueOnce(10) // REG746
      .mockResolvedValueOnce(15) // REG536
      .mockResolvedValueOnce(5) // status=approved
      .mockResolvedValueOnce(8) // REG745 + active
      .mockResolvedValueOnce(4) // REG746 + active
      .mockResolvedValueOnce(6) // REG536 + active
      .mockResolvedValueOnce(2) // JARDE + active

    const result = await repository.findStat()

    /* eslint-disable sort-keys */
    expect(result).toStrictEqual({
      Total_etudes: 100,
      'Investigations_cliniques_(DM)': 20,
      'Etudes_performance_(DMDIV)': 10,
      'Essais_cliniques_médicament_(CTIS)': 15,
      'Recherches_impliquant_personnes_humaines_(JARDE)': 55, // 100 - (20+10+15)
      Total_Etudes_à_démarrer: 5,
      Etudes_en_cours_DM: 8,
      Etudes_en_cours_DMDIV: 4,
      Etudes_en_cours_CTIS: 6,
      Etudes_en_cours_JARDE: 2,
      Total_Etudes_en_cours: 20, // 8+4+6+2
    })
    /* eslint-enable sort-keys */

    // Vérifier que countDocuments a bien été appelé 9 fois
    expect(mockCountDocuments).toHaveBeenCalledTimes(9)
  })
})
