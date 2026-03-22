import type { TransactionRepository } from '../../domain/repositories'
import type { Transaction } from '../../domain/models'

export class TransactionService {
  readonly repo: TransactionRepository

  constructor(repo: TransactionRepository) {
    this.repo = repo
  }

  async list(): Promise<Transaction[]> {
    return this.repo.findAll()
  }
}
