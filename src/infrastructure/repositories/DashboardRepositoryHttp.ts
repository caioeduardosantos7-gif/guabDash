import type { DashboardRepository } from '../../domain/repositories'
import type { DashboardStats, SalesReport, BestsellerProduct } from '../../domain/models'
import type { HttpClient } from '../api/HttpClient'

export class DashboardRepositoryHttp implements DashboardRepository {
  readonly http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  async getStats(): Promise<DashboardStats> {
    return this.http.get<DashboardStats>('/api/dashboard/stats')
  }

  async getSalesReport(period: string, month: string): Promise<SalesReport> {
    return this.http.get<SalesReport>(`/api/dashboard/sales-report?period=${encodeURIComponent(period)}&month=${encodeURIComponent(month)}`)
  }

  async getBestsellers(): Promise<BestsellerProduct[]> {
    return this.http.get<BestsellerProduct[]>('/api/dashboard/bestsellers')
  }
}
