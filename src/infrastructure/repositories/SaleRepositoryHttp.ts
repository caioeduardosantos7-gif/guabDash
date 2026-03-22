import type { SaleRepository } from '../../domain/repositories'
import type { Sale, SaleItem } from '../../domain/models'
import type { HttpClient } from '../api/HttpClient'

export class SaleRepositoryHttp implements SaleRepository {
  readonly http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  async create(data: { customerId: number | null; items: Omit<SaleItem, 'id'>[] }): Promise<Sale> {
    return this.http.post<Sale>('/api/sales', data)
  }

  async findAll(): Promise<Sale[]> {
    return this.http.get<Sale[]>('/api/sales')
  }
}
