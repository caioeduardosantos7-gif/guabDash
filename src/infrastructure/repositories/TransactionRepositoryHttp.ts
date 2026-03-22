import type { TransactionRepository } from '../../domain/repositories'
import type { Transaction } from '../../domain/models'
import type { HttpClient } from '../api/HttpClient'

export class TransactionRepositoryHttp implements TransactionRepository {
  readonly http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  async findAll(): Promise<Transaction[]> {
    return this.http.get<Transaction[]>('/api/transactions')
  }
}
