import type { SaleRepository } from '../../domain/repositories'
import type { Sale, SaleItem } from '../../domain/models'

export class SaleService {
  readonly repo: SaleRepository

  constructor(repo: SaleRepository) {
    this.repo = repo
  }

  async register(data: { customerId: number | null; items: Omit<SaleItem, 'id'>[] }): Promise<Sale> {
    return this.repo.create(data)
  }

  async list(): Promise<Sale[]> {
    return this.repo.findAll()
  }
}
