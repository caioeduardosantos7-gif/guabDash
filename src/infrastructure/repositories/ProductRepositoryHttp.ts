import type { ProductRepository } from '../../domain/repositories'
import type { Product } from '../../domain/models'
import type { HttpClient } from '../api/HttpClient'

export class ProductRepositoryHttp implements ProductRepository {
  readonly http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  async findAll(): Promise<Product[]> {
    return this.http.get<Product[]>('/api/products')
  }

  async findById(id: number): Promise<Product | null> {
    return this.http.get<Product | null>(`/api/products/${id}`)
  }

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return this.http.post<Product>('/api/products', data)
  }

  async update(id: number, data: Omit<Product, 'id'>): Promise<Product> {
    return this.http.put<Product>(`/api/products/${id}`, data)
  }

  async delete(id: number): Promise<void> {
    return this.http.delete(`/api/products/${id}`)
  }

  async getCategories(): Promise<string[]> {
    return this.http.get<string[]>('/api/products/categories')
  }
}
