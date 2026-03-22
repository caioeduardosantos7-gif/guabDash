import type { Sale } from '../models'
import type { SaleItem } from '../models'

export interface SaleRepository {
  create(data: { customerId: number | null; items: Omit<SaleItem, 'id'>[] }): Promise<Sale>
  findAll(): Promise<Sale[]>
}
