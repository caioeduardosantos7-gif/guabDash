import type { Customer } from '../models'

export interface CustomerRepository {
  findAll(): Promise<Customer[]>
  findById(id: number): Promise<Customer | null>
  create(data: Omit<Customer, 'id'>): Promise<Customer>
  update(id: number, data: Omit<Customer, 'id'>): Promise<Customer>
  delete(id: number): Promise<void>
}
