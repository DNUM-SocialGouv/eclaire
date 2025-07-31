export interface StatisticsRepository {
    findStat(): Promise<Record<string, number>>
}
