import type { DashboardStats } from '../models'
import type { SalesReport } from '../models'
import type { BestsellerProduct } from '../models'

export interface DashboardRepository {
  getStats(): Promise<DashboardStats>
  getSalesReport(period: string, month: string): Promise<SalesReport>
  getBestsellers(): Promise<BestsellerProduct[]>
}
