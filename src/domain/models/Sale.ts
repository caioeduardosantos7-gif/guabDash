import type { SaleItem } from './SaleItem'

export interface Sale {
  id: number
  customerId: number | null
  items: SaleItem[]
  total: number
  createdAt: string
}
