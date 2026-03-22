import type { CustomerRepository } from '../../domain/repositories'
import type { Customer } from '../../domain/models'

export class CustomerService {
  readonly repo: CustomerRepository

  constructor(repo: CustomerRepository) {
    this.repo = repo
  }

  async list(): Promise<Customer[]> {
    return this.repo.findAll()
  }

  async getById(id: number): Promise<Customer | null> {
    return this.repo.findById(id)
  }

  async create(data: Omit<Customer, 'id'>): Promise<Customer> {
    return this.repo.create(data)
  }

  async update(id: number, data: Omit<Customer, 'id'>): Promise<Customer> {
    return this.repo.update(id, data)
  }

  async remove(id: number): Promise<void> {
    return this.repo.delete(id)
  }
}
