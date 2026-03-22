import type { DashboardRepository } from '../../domain/repositories'
import type { DashboardStats, SalesReport, BestsellerProduct } from '../../domain/models'

export class DashboardService {
  readonly repo: DashboardRepository

  constructor(repo: DashboardRepository) {
    this.repo = repo
  }

  async getStats(): Promise<DashboardStats> {
    return this.repo.getStats()
  }

  async getSalesReport(period: string, month: string): Promise<SalesReport> {
    return this.repo.getSalesReport(period, month)
  }

  async getBestsellers(): Promise<BestsellerProduct[]> {
    return this.repo.getBestsellers()
  }
}
