import type { Transaction } from '../models'

export interface TransactionRepository {
  findAll(): Promise<Transaction[]>
}
