import type { CustomerRepository } from '../../domain/repositories'
import type { Customer } from '../../domain/models'
import type { HttpClient } from '../api/HttpClient'

export class CustomerRepositoryHttp implements CustomerRepository {
  readonly http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  async findAll(): Promise<Customer[]> {
    return this.http.get<Customer[]>('/api/customers')
  }

  async findById(id: number): Promise<Customer | null> {
    return this.http.get<Customer | null>(`/api/customers/${id}`)
  }

  async create(data: Omit<Customer, 'id'>): Promise<Customer> {
    return this.http.post<Customer>('/api/customers', data)
  }

  async update(id: number, data: Omit<Customer, 'id'>): Promise<Customer> {
    return this.http.put<Customer>(`/api/customers/${id}`, data)
  }

  async delete(id: number): Promise<void> {
    return this.http.delete(`/api/customers/${id}`)
  }
}
